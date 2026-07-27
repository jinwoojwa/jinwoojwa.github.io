import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { matter } from 'gray-matter-es';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DOCS_DIR = path.resolve(__dirname, '../public/docs');
export const MENU_PATH = path.join(DOCS_DIR, 'menu.json');

function readFrontmatter(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return matter(raw).data;
  } catch (e) {
    console.warn(
      `[generate-menu] "${filePath}" frontmatter를 읽지 못했습니다:`,
      e.message,
    );
    return {};
  }
}

function readSeriesTitle(subPath, files) {
  for (const filename of files) {
    const { series } = readFrontmatter(path.join(subPath, filename));
    if (series) return series;
  }
  return null;
}

function sortFiles(files) {
  return [...files].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
}

// 파일마다 fetch 없이 사이드바에서 바로 제목을 표시할 수 있도록
// frontmatter의 title을 빌드 타임에 미리 읽어 menu.json에 포함시킨다.
function toFileEntries(dirPath, filenames) {
  return filenames.map((filename) => {
    const { title } = readFrontmatter(path.join(dirPath, filename));
    return { filename, title: title || filename.replace('.md', '') };
  });
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
      menu[top] = toFileEntries(topPath, rootFiles);
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
      const seriesTitle = readSeriesTitle(subPath, files);
      const fileEntries = toFileEntries(subPath, files);
      menu[top][sub] = seriesTitle
        ? { title: seriesTitle, files: fileEntries }
        : fileEntries;
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
