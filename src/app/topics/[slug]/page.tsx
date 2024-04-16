import PostCreateForm from "@/components/posts/PostCreateForm";

interface TopicShowPageProps {
    params: {
        slug: string
    }
}

export default async function topicShowPage(props: TopicShowPageProps){

    const slug = props.params.slug;

    return(
        <div className = "grid grid-cols-4 gap-4 p-4">
            <div className = "col-span-3">
                <h1 className = "text-2xl font-bold mb-2"> {slug} </h1>
            </div>

            <PostCreateForm slug = {slug} />
        </div>
    );
}