import React, { useState } from "react";

const CompanyList = ({ searchQuery }) => {
  const [companies] = useState([
    {
      id: 1,
      name: "DataMaster",
      email: "contact@DataMaster.com",
      studentsNumber: "02",
      logo: "/DataMaster-logo.jpeg",
      representativeFirstName: "John",
      representativeLastName: "Doe",
    },
    {
      id: 2,
      name: "Sogesie",
      email: "contact@Sogesie.com",
      studentsNumber: "04",
      logo: "/Sogesie-logo.PNG",
      representativeFirstName: "Jane",
      representativeLastName: "Smith",
    },
    {
      id: 3,
      name: "Naltis",
      email: "support@Naltis.com",
      studentsNumber: "04",
      logo: "/Naltis-logo.PNG",
      representativeFirstName: "Emily",
      representativeLastName: "Johnson",
    },
    {
      id: 4,
      name: "Azimut",
      email: "hello@Azimut.com",
      studentsNumber: "02",
      logo: "/Azimut-logo.PNG",
      representativeFirstName: "Michael",
      representativeLastName: "Brown",
    },
    {
      id: 5,
      name: "Eurequat",
      email: "services@Eurequat.com",
      studentsNumber: "04",
      logo: "/a.PNG",
      representativeFirstName: "Sarah",
      representativeLastName: "Davis",
    },
  ]);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.studentsNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (company.representativeFirstName + " " + company.representativeLastName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="company-list bg-white rounded-xl">
      {/* Column Headers */}
      <div className="flex justify-between items-center pl-2 pb-1 border-b border-gray-300 font-medium text-gray-3 text-xs font-Roboto">
        <div className="flex justify-start items-start w-[30%]">Company</div>
        <div className="flex justify-start items-start w-[30%]">
          Representative
        </div>
        <div className="flex justify-start items-start w-[20%]">
          Students Number
        </div>
        <div className="flex justify-start items-start w-[20%]"></div>
      </div>

      {/* Scrollable List of Companies */}
      <div className="max-h-80 overflow-y-auto">
        <ul className="list-none p-0">
          {filteredCompanies.map((company) => (
            <li
              key={company.id}
              className="flex justify-between items-center p-2 border-b border-gray-200 gap-4"
            >
              <div className="flex flex-row justify-start items-start gap-2 w-[30%]">
                <img
                  src={company.logo}
                  className="w-10 h-10 rounded-xl"
                  alt={`${company.name} logo`}
                />
                <div className="flex flex-col justify-start items-start">
                  <p className="font-medium text-13 text-blue-2">
                    {company.name}
                  </p>
                  <p className="text-11 text-gray-4">{company.email}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start w-[30%]">
                <p className="text-13 text-gray-600">
                  {company.representativeFirstName}{" "}
                  {company.representativeLastName}
                </p>
              </div>
              <div className="flex flex-col justify-center items-start w-[20%]">
                <p className="font-Arial text-14 pt-1 pl-7">
                  {company.studentsNumber}
                </p>
              </div>

              <div className="flex flex-row justify-end items-center gap-1 w-[20%]">
                <button
                  className="text-gray-3 hover:bg-gray-100 rounded-md py-1 px-2 text-xs font-Roboto"
                  onClick={() => handleEditClick(company)}
                >
                  Edit
                </button>
                <button className="text-red-3 bg-red-2 hover:bg-blue-3 rounded-md py-1 px-2 text-xs font-Roboto">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
      {isModalOpen && selectedCompany && (
        <div className="fixed right-0 -top-16 h-screen w-full flex items-center justify-center bg-gray-4 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-dashed border-blue-5 flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold mb-6">✏️ Edit Company</h3>

            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-col w-full justify-between items-start gap-2">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="repFirstName"
                    className="text-gray-2 text-13 pl-1 mb-0.5"
                  >
                    Representative First Name
                  </label>
                  <input
                    id="repFirstName"
                    type="text"
                    value={selectedCompany.representativeFirstName}
                    onChange={(e) =>
                      setSelectedCompany({
                        ...selectedCompany,
                        representativeFirstName: e.target.value,
                      })
                    }
                    className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="repLastName"
                    className="text-gray-2 text-13 pl-1 mb-0.5"
                  >
                    Representative Last Name
                  </label>
                  <input
                    id="repLastName"
                    type="text"
                    value={selectedCompany.representativeLastName}
                    onChange={(e) =>
                      setSelectedCompany({
                        ...selectedCompany,
                        representativeLastName: e.target.value,
                      })
                    }
                    className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="relative w-1/3 ml-4">
                <label
                  htmlFor="logoInput"
                  className="block w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500"
                >
                  <img
                    src={selectedCompany.logo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </label>
                <input
                  id="logoInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="email"
                className="text-gray-2 text-13 pl-1 pt-2 mb-0.5"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={selectedCompany.email}
                onChange={(e) =>
                  setSelectedCompany({
                    ...selectedCompany,
                    email: e.target.value,
                  })
                }
                className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="studentsNumber"
                className="text-gray-2 text-13 pl-1 pt-2 mb-0.5"
              >
                Students Number
              </label>
              <input
                id="studentsNumber"
                type="text"
                value={selectedCompany.studentsNumber}
                onChange={(e) =>
                  setSelectedCompany({
                    ...selectedCompany,
                    studentsNumber: e.target.value,
                  })
                }
                className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-row justify-end mt-6 w-full gap-3">
              <button
                onClick={closeModal}
                className="mt-4 bg-red-1 text-13 text-white py-1 px-4 rounded hover:bg-red-600"
              >
                Discard
              </button>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-6 text-13 text-white py-1 px-4 rounded hover:bg-blue-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
