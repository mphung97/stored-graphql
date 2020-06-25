import { ApolloError, UserInputError } from "apollo-server-express";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { LinkModel } from "../models/Link";
import { Link, UpdateLinkInput, LinksResult } from "../types/LinkTypes";
import fetchMetaTag from "../utils/fetchMetaTag";
import { isUrl } from "../utils/isURL";

@Resolver()
export class LinkResolver {
  @Authorized()
  @Mutation(() => Link)
  async createLink(@Arg("url") url: string, @Ctx() { uid }: any) {
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
    @Arg("input") input: UpdateLinkInput
  ) {
    try {
      await LinkModel.findByIdAndUpdate(id, input);
      return true;
    } catch (error) {
      throw new ApolloError("Internal server error", "500");
    }
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
  @Query(() => LinksResult)
  async allLinks(
    @Arg("limit", { defaultValue: 1, nullable: true })
    limit: number,
    @Arg("page", { defaultValue: 1, nullable: true })
    page: number,
    @Ctx() { uid }: any
  ) {
    const links = await LinkModel.find({ uid })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalCount = await LinkModel.countDocuments();
    const hasNextPage = (page - 1) * limit + limit < totalCount;
    return {
      totalCount,
      hasNextPage,
      links,
    };
  }

  @Authorized()
  @Query(() => Link)
  link(@Arg("id") id: string) {
    return LinkModel.findById(id);
  }
}
