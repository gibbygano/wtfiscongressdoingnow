export default ({ feed }: { feed: Array<string> }) => {
    console.log(feed);
    return (
        <div class="lg:columns-3 2xl:columns-5 xl:columns-4 md:columns-2 sm:columns-1 md:text-sm lg:text-base text-xs gap-5 px-7 pt-10">
            {feed.map((li) => <div dangerouslySetInnerHTML={{ __html: li }} />)}
            <script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>
        </div>
    );
};
