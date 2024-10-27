export default function ShoppingCartSpinner() {
  return (
    <div className="flex justify-center items-start w-screen h-screen">
      <div className="relative w-96 h-96 mt-20">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g className="animate-[slide_2s_ease-in-out_infinite_alternate]">
            <path
              d="M95 70 C100,65 105,65 110,70 C115,75 110,80 105,80 C100,80 90,75 95,70"
              className="fill-green-500 animate-[grow_2s_infinite] origin-top"
            />
            <path
              d="M85 75 C90,70 95,70 100,75 C105,80 100,85 95,85 C90,85 80,80 85,75"
              className="fill-green-500 animate-[grow_2s_infinite_0.7s] origin-left"
            />
            <path
              d="M105 73 C110,68 115,68 120,73 C125,78 120,83 115,83 C110,83 100,78 105,73"
              className="fill-green-500 animate-[grow_2s_infinite_1.4s] origin-top"
            />

            <g transform="translate(52, 60) scale(1.2)">
              <path
                d="M32 88C34.2091 88 36 86.2091 36 84C36 81.7909 34.2091 80 32 80C29.7909 80 28 81.7909 28 84C28 86.2091 29.7909 88 32 88Z"
                stroke="black"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M76 88C78.2091 88 80 86.2091 80 84C80 81.7909 78.2091 80 76 80C73.7909 80 72 81.7909 72 84C72 86.2091 73.7909 88 76 88Z"
                stroke="black"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.19922 8.2002H16.1992L26.8392 57.8802C27.2295 59.6996 28.2419 61.3261 29.7021 62.4796C31.1622 63.6332 32.9788 64.2416 34.8392 64.2002H73.9592C75.7799 64.1973 77.5452 63.5734 78.9633 62.4315C80.3815 61.2897 81.3678 59.6983 81.7592 57.9202L88.3592 28.2002H20.4792"
                stroke="black"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
