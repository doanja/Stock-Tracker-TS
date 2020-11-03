type Recipe = {
  analyzedInstructions: Instructions[];
  cheap: boolean;
  dairyFree: boolean;
  extendedIngredients: ExtendedIngredients[];
  glutenFree: boolean;
  id: number;
  image: string;
  instructions: string;
  lowFodmap: boolean;
  nutrition: Nutrition;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  sustainable: boolean;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
};

type Instructions = {
  steps: Steps[];
};

type Steps = {
  step: string;
};

type ExtendedIngredients = {
  name: string;
  originalString: string;
};

type Nutrition = {
  nutrients: Nutrients[];
};

type Nutrients = {
  amount: number;
  percentOfDailyNeeds: number;
  title: string;
};

type GetRecipeId = (query: string, offset?: number, number?: number) => void;

type GetSimilarRecipes = (id: number, number: number) => void;

type LoadRandomRecipe = () => void;

type LoadPrevious = () => void;

type LoadNext = () => void;

type LoadRecipe = (recipe: Recipe) => void;

// type ToggleModal = () => void;

type ToggleModal = (errorText?: string) => void;

type SignupFormValues = {
  email: string;
  password: string;
  password_2: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};
