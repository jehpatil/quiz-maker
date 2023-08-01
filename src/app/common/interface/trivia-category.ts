export interface TriviaCategoryResponse {
  trivia_categories: TriviaCategory[];
}

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface DifficultyLevels {
    name: string,
    value: string
}
