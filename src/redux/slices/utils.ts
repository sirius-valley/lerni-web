import { removeHtmlTags } from '../../utils/utils';
import { BubbleResponseQuestionnaire } from '../service/types/questionnaire.response';

export const transformResponseBlock = (acc: any[], block: BubbleResponseQuestionnaire) => {
  if (block?.content) {
    return {
      ...acc,
      [block.id]: {
        ...block,
        content: removeHtmlTags(block.content),
      },
    };
  } else if (block?.options) {
    let sealed = false;
    return {
      ...acc,
      [block.id]: {
        ...block,
        options: block.options.reduce((acc: any, option: string, idx: number) => {
          const selected = getSelectedValue(block.value ?? '', option);
          typeof block.value === 'string' ? block.value?.replaceAll('"', '') === option : false;
          // Check if it has any value selected to sealed the block.
          if (!sealed) sealed = selected;

          return [
            ...acc,
            {
              id: option,
              text: option,
              selected: block.value === '' ? undefined : selected,
              ...(block.type === 'carousel' && { image: option }),
              ...(block.optionDescriptions && { description: block.optionDescriptions[idx] }),
            },
          ];
        }, []),
        sealed,
      },
    };
  } else {
    return {
      ...acc,
      [block.id]: block,
    };
  }
};

const getSelectedValue = (value: string | string[], option: string) => {
  if (typeof value === 'string') return value?.replaceAll('"', '') === option;
  if (Array.isArray(value)) return value.includes(option);
  return false;
};
