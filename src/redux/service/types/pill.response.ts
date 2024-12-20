export type BubbleResponse = {
  id: string;
  type: 'text' | 'single-choice' | 'multiple-choice' | 'carousel' | 'free-text';
  content?: string;
  options?: string[];
  optionDescriptions?: string[];
  imgOptions?: ImagesOptions[];
  correctAnswer?: string[];
  correct?: boolean;
  points?: number;
  value?: string | string[];
};

export type PillResponse = {
  pill: {
    id: string;
    name: string;
    description: string;
    teacherComment: string;
    version: number;
    completionTimeMinutes: number;
    completed: boolean;
    progress: number;
    bubbles: BubbleResponse[];
  };
  teacher?: {
    id: string;
    name: string;
    lastname: string;
    profession: string;
    image: string;
  };
};

export type PillAnswerBody = {
  pillId: string;
  questionId: string;
  answer: string | string[];
};

export type ImagesOptions = {
  title: string;
  description: string;
  image: string;
  id?: string;
  selected?: boolean;
};

export type FeedbackBody = {
  vote: 'up' | 'down';
  programId: string;
  content: string;
  privacy: 'public' | 'private';
};
