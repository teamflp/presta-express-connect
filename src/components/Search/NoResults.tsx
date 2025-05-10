
interface NoResultsProps {
  location?: string | null;
}

function NoResults({ location }: NoResultsProps) {
  return (
    <div className="text-center py-8 animate-fadeIn">
      <div className="text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">Aucun résultat trouvé</h3>
      {location ? (
        <p className="text-gray-500">Nous n'avons pas trouvé d'artisans dans la zone "{location}"</p>
      ) : (
        <p className="text-gray-500">Essayez d'autres critères de recherche</p>
      )}
      <div className="mt-6">
        <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
          Étendre la recherche
        </button>
      </div>
    </div>
  );
}

export default NoResults;
