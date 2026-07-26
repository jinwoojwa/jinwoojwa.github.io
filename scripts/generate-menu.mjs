import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { matter } from 'gray-matter-es';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DOCS_DIR = path.resolve(__dirname, '../public/docs');
export const MENU_PATH = path.join(DOCS_DIR, 'menu.json');

function readSeriesTitle(subPath, files) {
  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(subPath, filename), 'utf-8');
      const { data } = matter(raw);
      if (data.series) return data.series;
    } catch (e) {
      console.warn(
        `[generate-menu] "${filename}" frontmatter를 읽지 못했습니다:`,
        e.message,
      );
    }
  }
  return null;
}

function sortFiles(files) {
  return [...files].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
}

export function generateMenu() {
  const menu = {};

  const topEntries = fs
    .readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  for (const top of topEntries) {
    const topPath = path.join(DOCS_DIR, top);
    const entries = fs.readdirSync(topPath, { withFileTypes: true });

    const rootFiles = sortFiles(
      entries
        .filter((e) => e.isFile() && e.name.endsWith('.md'))
        .map((e) => e.name),
    );
    const subDirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();

    if (subDirs.length === 0) {
      menu[top] = rootFiles;
      continue;
    }

    if (rootFiles.length > 0) {
      console.warn(
        `[generate-menu] "${top}"에 하위 카테고리와 최상위 파일이 섞여 있어 최상위 파일(${rootFiles.join(', ')})은 메뉴에서 제외됩니다.`,
      );
    }

    menu[top] = {};
    for (const sub of subDirs) {
      const subPath = path.join(topPath, sub);
      const files = sortFiles(
        fs
          .readdirSync(subPath, { withFileTypes: true })
          .filter((e) => e.isFile() && e.name.endsWith('.md'))
          .map((e) => e.name),
      );
      const title = readSeriesTitle(subPath, files);
      menu[top][sub] = title ? { title, files } : files;
    }
  }

  const next = JSON.stringify(menu, null, 2) + '\n';
  const prev = fs.existsSync(MENU_PATH)
    ? fs.readFileSync(MENU_PATH, 'utf-8')
    : null;

  if (next !== prev) {
    fs.writeFileSync(MENU_PATH, next, 'utf-8');
    console.log('[generate-menu] menu.json을 갱신했습니다.');
  }

  return menu;
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  generateMenu();
}
