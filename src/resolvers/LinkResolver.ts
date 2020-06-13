import { ApolloError, UserInputError } from "apollo-server-express";
import { Arg, /* Ctx ,*/ Mutation, Query, Resolver } from "type-graphql";
import { LinkModel } from "../models/Link";
import { Link, LinkInput, LinkUpdateInput } from "../types/LinkTypes";
import fetchMetaTag from "../utils/fetchMetaTag";
import { isUrl } from "../utils/isURL";

@Resolver()
export class LinkResolver {
  @Mutation(() => Link)
  async createLink(
    @Arg("options", () => LinkInput) { url, uid }: LinkInput // @Ctx() { req }: any
  ) {
    if (!isUrl(url)) {
      throw new UserInputError("URL invalid", {
        invalidArgs: "url",
      });
    }
    try {
      const metadata = await fetchMetaTag(url);
      if (metadata.description.length > 110) {
        metadata.description = metadata.description.substring(0, 110) + "...";
      }
      const options = { ...metadata, uid };
      return await LinkModel.create(options);
    } catch (error) {
      throw new ApolloError("Internal server error", "500");
    }
  }

  @Mutation(() => Boolean)
  async updateLink(
    @Arg("id") id: string,
    @Arg("input", () => LinkUpdateInput) input: LinkUpdateInput
  ) {
    await LinkModel.findByIdAndUpdate(id, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteLink(@Arg("id", () => String) id: string) {
    await LinkModel.findByIdAndDelete(id);
    return true;
  }

  @Query(() => [Link])
  links() {
    return LinkModel.find();
  }

  @Query(() => Link)
  link(@Arg("id") id: string) {
    return LinkModel.findById(id);
  }
}
