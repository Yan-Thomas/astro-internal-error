import { transform, parse } from '@astrojs/compiler';
import { walk, is } from '@astrojs/compiler/utils';
import { readFileSync } from 'fs';
import MagicString from 'magic-string';

export default function astroPlugin() {
  return {
    name: 'astro-plugin',
    async transform(code, id) {
      console.log(id);
      if (id.endsWith('.astro')) {
        const content = readFileSync(id, 'utf8');
        const source = await parse(content);

        const magicString = new MagicString(content);

        walk(source.ast, (node) => {
          if (is.tag(node)) {
            const { offset, line, column } = node.position.start;
            const { name } = node;

            const insertPosition = offset + name.length;
            const inspectorString = ` data-astro-test="test" `;

            magicString.appendLeft(insertPosition, inspectorString);
          }
        });

        const transformedSource = await transform(magicString.toString(), {
          site: 'http://localhost:3000',
          sourcefile: id,
          sourcemap: 'both',
          internalURL: 'astro/internal',
        });

        //console.log(transformedSource.map);

        return {
          code: transformedSource.code,
          map: transformedSource.map,
        };
      }
    },
  };
}
