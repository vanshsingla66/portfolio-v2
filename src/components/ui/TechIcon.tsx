import type { ComponentType } from "react";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiSocketdotio,
  SiMongodb,
  SiMysql,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiGit,
  SiGithub,
  SiPostman,
  SiRender,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { TbDatabase, TbApi, TbChartHistogram, TbBrandVscode } from "react-icons/tb";

type IconComp = ComponentType<{ size?: number }>;

const map: Record<string, IconComp> = {
  python: SiPython,
  javascript: SiJavascript,
  java: FaJava,
  sql: TbDatabase,
  react: SiReact,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss,
  reactquery: SiReactquery,
  node: SiNodedotjs,
  express: SiExpress,
  rest: TbApi,
  jwt: SiJsonwebtokens,
  socket: SiSocketdotio,
  mongo: SiMongodb,
  mysql: SiMysql,
  sklearn: SiScikitlearn,
  numpy: SiNumpy,
  pandas: SiPandas,
  matplotlib: TbChartHistogram,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  vscode: TbBrandVscode,
  render: SiRender,
};

const TechIcon = ({ icon, size = 26 }: { icon: string; size?: number }) => {
  const Comp = map[icon];
  if (!Comp) {
    // Fallback monogram (e.g. Zustand has no brand icon)
    return (
      <span
        className="mono"
        style={{ fontSize: size * 0.62, fontWeight: 700, lineHeight: 1 }}
      >
        {icon.slice(0, 2).replace(/^\w/, (c) => c.toUpperCase())}
      </span>
    );
  }
  return <Comp size={size} />;
};

export default TechIcon;
