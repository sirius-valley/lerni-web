import { BubbleResponse } from './pill.response';

export interface BubbleResponseQuestionnaire extends BubbleResponse {
  correct?: boolean;
  correctValue?: string[];
  pointsAwarded?: number;
}

export enum QuestionnaireState {
  INPROGRESS = 'InProgress',
  FAILED = 'Failed',
  COMPLETED = 'Completed',
}

export type QuestionnaireResponse = {
  questionnaire: {
    questionnaireState: QuestionnaireState;
    progress: number;
    correct?: boolean;
    correctValue?: string[];
    pointsAwarded?: number;
    unlockTime?: string;
    bubbles: BubbleResponseQuestionnaire[];
  };
  teacher: {
    id: string;
    name: string;
    lastname: string;
    profession: string;
    image?: string;
  };
};

export type QuestionnaireBody = {
  questionnaireId: string;
  questionId: string;
  answer: string | string[];
};
