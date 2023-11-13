import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { PopularTagType } from '../../../types/popularTag.type'

export const popularTagsActions = createActionGroup({
  source: 'Popular Tags',
  events: {
    'Get popular tags': emptyProps(),
    'Get popular tags success': props<{ popularTags: PopularTagType[] }>(),
    'Get popular tags failure': emptyProps(),
  },
})
