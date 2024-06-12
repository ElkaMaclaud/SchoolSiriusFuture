import React from "react";

const Home = ({ isActive }: {isActive?: boolean}) => {
  const fillColor = isActive ? "#fff" : "#434B74";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.83155 10.9498C1.43566 11.227 1.33938 11.7726 1.6165 12.1684C1.89363 12.5643 2.43921 12.6606 2.83511 12.3835L1.83155 10.9498ZM14 3.5L14.5018 2.78317C14.2005 2.57228 13.7995 2.57228 13.4982 2.78317L14 3.5ZM25.1649 12.3835C25.5608 12.6606 26.1064 12.5643 26.3835 12.1684C26.6606 11.7726 26.5643 11.227 26.1684 10.9498L25.1649 12.3835ZM16.625 24.5C16.625 24.9833 17.0167 25.375 17.5 25.375C17.9832 25.375 18.375 24.9833 18.375 24.5H16.625ZM9.625 24.5C9.625 24.9833 10.0167 25.375 10.5 25.375C10.9832 25.375 11.375 24.9833 11.375 24.5H9.625ZM4.37499 11.6667V10.7917H2.62499V11.6667H4.37499ZM10.5 25.8332H11.375V24.0832H10.5V25.8332ZM25.375 11.6667V10.7917H23.625V11.6667H25.375ZM17.5 24.0832H16.625V25.8332H17.5V24.0832ZM2.83511 12.3835L14.5018 4.21683L13.4982 2.78317L1.83155 10.9498L2.83511 12.3835ZM13.4982 4.21683L25.1649 12.3835L26.1684 10.9498L14.5018 2.78317L13.4982 4.21683ZM18.375 24.5V17.5H16.625V24.5H18.375ZM18.375 17.5C18.375 15.7276 16.9391 14.2917 15.1667 14.2917V16.0417C15.9726 16.0417 16.625 16.6941 16.625 17.5H18.375ZM15.1667 14.2917H12.8333V16.0417H15.1667V14.2917ZM12.8333 14.2917C11.0609 14.2917 9.625 15.7276 9.625 17.5H11.375C11.375 16.6941 12.0274 16.0417 12.8333 16.0417V14.2917ZM9.625 17.5V24.5H11.375V17.5H9.625ZM2.62499 11.6667V22.6239H4.37499V11.6667H2.62499ZM2.62499 22.6239C2.62499 24.3963 4.06185 25.8332 5.8343 25.8332V24.0832C5.02835 24.0832 4.37499 23.4298 4.37499 22.6239H2.62499ZM5.8343 25.8332H10.5V24.0832H5.8343V25.8332ZM23.625 11.6667V22.6239H25.375V11.6667H23.625ZM23.625 22.6239C23.625 23.4298 22.9716 24.0832 22.1657 24.0832V25.8332C23.9381 25.8332 25.375 24.3963 25.375 22.6239H23.625ZM22.1657 24.0832H17.5V25.8332H22.1657V24.0832Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default Home;
