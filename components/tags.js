export default function Tags({ tags }) {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => {
        return <span key={tag} className="mx-2 text-stone-400	">{"#"+tag}</span>;
      })}
    </div>
  );
}
