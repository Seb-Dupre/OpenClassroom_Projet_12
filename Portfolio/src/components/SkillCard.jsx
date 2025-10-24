export default function SkillCard({ name, icon }) {
  return (
    <div>
      <img src={icon} alt={name} width="40" height="40" />
      <div>{name}</div>
    </div>
  );
}
// ajouté une bar de pourcentage sur la connaissance de l'outil
