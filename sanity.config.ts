import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Johan Moreno Blog',
  projectId: 'll6z9y20',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('About')
              .child(
                S.document()
                  .schemaType('page')
                  .documentId('page-about')
                  .title('About')
              ),
            S.listItem()
              .title('Portfolio')
              .child(
                S.document()
                  .schemaType('page')
                  .documentId('page-portfolio')
                  .title('Portfolio')
              ),
            S.listItem()
              .title('Work')
              .child(
                S.document()
                  .schemaType('page')
                  .documentId('page-work')
                  .title('Work')
              ),
            S.divider(),
            // Regular document types
            ...S.documentTypeListItems().filter(
              (listItem: any) => listItem.getId() !== 'page'
            ),
            // Custom grouping for generic pages if needed, or just regular list
            S.documentTypeListItem('page').title('All Pages'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
