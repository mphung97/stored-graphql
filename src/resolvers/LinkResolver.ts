import { ApolloError, UserInputError } from "apollo-server-express";
import { Arg, Ctx, Mutation, Query, Resolver, Authorized, Int } from "type-graphql";
import { LinkModel } from "../models/Link";
import { Link, LinkUpdateInput } from "../types/LinkTypes";
import fetchMetaTag from "../utils/fetchMetaTag";
import { isUrl } from "../utils/isURL";

@Resolver()
export class LinkResolver {
  @Authorized()
  @Mutation(() => Link)
  async createLink(@Arg("url", () => String) url: string, @Ctx() { uid }: any) {
    if (!isUrl(url)) {
      throw new UserInputError("URL invalid", {
        invalidArgs: "url",
      });
    }
    const isExist = await LinkModel.exists({ url, uid });
    if (isExist) {
      throw new UserInputError("URL is existed", {
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

  @Authorized()
  @Mutation(() => Boolean)
  async updateLink(
    @Arg("id") id: string,
    @Arg("input", () => LinkUpdateInput) input: LinkUpdateInput
  ) {
    await LinkModel.findByIdAndUpdate(id, input);
    return true;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteLink(@Arg("id", () => String) id: string, @Ctx() { uid }: any) {
    const isDeleted = await LinkModel.deleteOne({ _id: id, uid });
    if (!isDeleted.deletedCount) {
      throw new UserInputError("Bad request!");
    }
    return true;
  }

  @Authorized()
  @Query(() => [Link])
  links(
    @Arg("page", () => Int, { defaultValue: 0, nullable: true })
    page: number,
    @Ctx() { uid }: any
  ) {
    return LinkModel.find({ uid }, null, { skip: page * 15, limit: 15 });
  }

  @Authorized()
  @Query(() => Link)
  link(@Arg("id") id: string) {
    return LinkModel.findById(id);
  }
}
