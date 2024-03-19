import { api } from './api';
import { ConvertPillBody, ConvertTypeResponse } from './types/program.types';

export const programApi = api.injectEndpoints({
  endpoints: (builder) => ({
    convertToLerniPill: builder.mutation<ConvertTypeResponse, ConvertPillBody>({
      query: (body) => ({
        url: 'api/pill/adaptToPill',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useConvertToLerniPillMutation } = programApi;
