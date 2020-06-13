import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Movie } from "../models/Movie";
import { MovieInput, MovieUpdateInput } from "../types/MovieTypes";

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
    const movie = await Movie.create(options).save();
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id") id: string,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update(id, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => String) id: string) {
    await Movie.delete(id);
    return true;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }

  @Query(() => Movie)
  movie(@Arg("id") id: string) {
    return Movie.findOne(id);
  }
}
