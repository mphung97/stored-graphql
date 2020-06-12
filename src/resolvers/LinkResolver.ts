import { ApolloError, UserInputError } from "apollo-server-express";
import { Arg, /* Ctx ,*/ Mutation, Query, Resolver } from "type-graphql";
import { Link } from "../entity/Link";
import { LinkInput, LinkUpdateInput } from "../types/LinkTypes";
import fetchMetaTag from "../utils/fetchMetaTag";
import { isUrl } from "../utils/isURL";

@Resolver()
export class LinkResolver {
  @Mutation(() => Link)
  async createLink(
    @Arg("options", () => LinkInput) { url, userId }: LinkInput // @Ctx() { req }: any
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
      const options = { ...metadata, userId };
      return await Link.create(options).save();
    } catch (error) {
      throw new ApolloError("Internal server error", "500");
    }
  }

  @Mutation(() => Boolean)
  async updateLink(
    @Arg("id") id: string,
    @Arg("input", () => LinkUpdateInput) input: LinkUpdateInput
  ) {
    await Link.update(id, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteLink(@Arg("id", () => String) id: string) {
    await Link.delete(id);
    return true;
  }

  @Query(() => [Link])
  links() {
    return Link.find();
  }

  @Query(() => Link)
  link(@Arg("id") id: string) {
    return Link.findOne(id);
  }
}
