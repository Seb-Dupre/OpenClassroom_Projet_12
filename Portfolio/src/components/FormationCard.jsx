export default function FormationCard({ logo, title, description, tags }) {
  return (
    <div className="">
      <img src={logo} alt={title} className="" />
      <h3 className="">{title}</h3>
      <p className="">{description}</p>
      <div className="">
        {tags.map((tag, index) => (
          <span key={index} className="">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
