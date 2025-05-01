
interface ArgumentProps {
  icone: string;
  titre: string;
  description: string;
}

function Argument(props: ArgumentProps) {
  const { icone, titre, description } = props;

  return (
    <div className="flex flex-col items-center">
      <img src={`./assets/${icone}`} alt={`Image de ${titre}`} className="w-[clamp(50px,3vw,70px)] h-auto" />
      <div className="p-3 text-center">
        <h5 className="font-semibold mb-2">{titre}</h5>
        <p className="text-gray-600">{description}</p>
      </div> 
    </div>
  );
}

export default Argument;
