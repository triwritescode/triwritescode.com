import Image from "next/image";
import { PageBlocksNotFound } from "@/tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";

const NotFoundBlock = (props: PageBlocksNotFound) => {
  if (!props.enable) return null;

  return (
    <section
      id={props.sectionId || undefined}
      className="flex flex-col items-center justify-center px-5 py-20 min-h-[60vh] text-center"
    >
      <Image
        src={props.image || "/uploads/404-image.svg"}
        alt="Page Not Found Illustration"
        width={350}
        height={250}
        className="w-full max-w-[350px] h-auto mb-8"
      />

      <h1
        data-tina-field={tinaField(props, "title")}
        className="text-5xl font-bold text-gray-900"
      >
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        {props.title || "Page Not Found"}
      </h2>

      <div className="mt-4 max-w-md text-gray-600">
        <TinaMarkdown content={props.description} />
      </div>

      <Link
        href="/"
        className="mt-8 px-5 py-2.5 bg-primary-accent text-neutral-light font-semibold rounded-lg shadow-md hover:bg-primary-base focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-opacity-50 transition-colors"
      >
        {props.buttonText || "Go to Homepage"}
      </Link>
    </section>
  );
};

export default NotFoundBlock;
