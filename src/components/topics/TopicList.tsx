import { db } from "@/db";
import Link from "next/link";
import paths from "@/path";
import { Chip } from "@nextui-org/react";

export default async function TopicList(){

    const topics = await db.topic.findMany();

    const renderedTopics = topics.map((topic) => {
        return (
            <div key = {topic.slug} >
                <Link href = {paths.topicShow(topic.slug)}>
                    <Chip color = "danger" variant = "shadow">
                        { topic.slug }
                    </Chip>
                </Link>
            </div>
        )
    });

    return (
        <>
            <div className = "mt-4">
                <p className = "ml-4 text-lg"> Topics </p>
                <div className = "flex p-4 flex-wrap gap-4">
                    { renderedTopics }
                </div>
            </div>
        </>
    );
}