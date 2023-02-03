function isIncluded(array, title) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].name === title) {
      return true;
    }
  }
  return false;
}

function increaseTag(array, title) {
  array.map((tag) => {
    if (tag.name == title) {
      tag.count += 1;
      return;
    }
  });
}

export default function TagsCloud({ posts }) {
  let tags = new Array();
  // get array with tags
  posts.map(({ slug, frontmatter }) => {
    frontmatter.tags.map((tag) => {
      if (!isIncluded(tags, tag)) {
        tags.push({ name: tag, count: 1 });
      } else {
        increaseTag(tags, tag);
      }
    });
  });
  // sort the array
  tags.sort((a, b) => {
    if (a.count > b.count) return -1;
    if (a.count < b.count) return 1;
    else return 0;
  });

  return (
    <div className="flex flex-row justify-center w-full">
      <div className="flex flex-wrap mx-9 md:max-w-2xl justify-center">
        {tags.map((tag) => {
          return (
            <span key={tag.name} className="mx-2 text-stone-400 cursor-pointer">
              #{tag.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
