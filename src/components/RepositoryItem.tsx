import {
  LanguageIcon,
  StarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/16/solid";
import { Link, useParams } from "react-router-dom";
import { RoutesConfig } from "../constants";

const RepositoryIconText = ({
  text,
  Icon,
}: {
  text?: string | number;
  Icon: typeof StarIcon;
}) =>
  text?.toString() && (
    <div className="flex items-center flex-row gap-2">
      <Icon width={16} height={16} />
      <p className="text-sm">{text}</p>
    </div>
  );

interface IRepositoryItemProps {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  topics: string[];
  updated_at: string;
}

export const RepositorySkeleton = () => (
  <div className="flex w  flex-col gap-4">
    <div className="skeleton h-32 w-full" />
    <div className="skeleton h-4 w-28" />
    <div className="skeleton h-4 w-full" />
    <div className="skeleton h-4 w-full" />
  </div>
);
export const RepositoryItem = ({
  id,
  name,
  description,
  stargazers_count,
  forks_count,
  language,
  topics,
  updated_at,
}: IRepositoryItemProps) => {
  const { org } = useParams();
  return (
    <div className="flex flex-col w-full gap-2" key={id}>
      <p className="text-lg font-semibold text-secondary">
        {" "}
        <Link
          to={RoutesConfig.REPOSITORY_DETAIL.replace(
            ":repo",
            `${name}`
          ).replace(":org", org ?? "")}
        >
          {name}
        </Link>
      </p>

      <p className="text-sm">{description}</p>
      <div className="flex flex-row gap-2">
        <RepositoryIconText text={language} Icon={LanguageIcon} />
        |
        <RepositoryIconText text={stargazers_count} Icon={StarIcon} />
        |
        <RepositoryIconText text={forks_count} Icon={ArrowTrendingUpIcon} />
      </div>

      {!!(topics ?? []).length && (
        <div className="flex flex-row gap-1 w-full overflow-x-auto">
          {topics.map((topic) => (
            <p className="badge whitespace-nowrap" key={topic}>
              {topic}
            </p>
          ))}
        </div>
      )}
      <p className="text-slate-700 text-xs">
        Updated on {new Date(updated_at)?.toLocaleDateString()}
      </p>
      <div className="divider max-w-screen-sm" />
    </div>
  );
};
