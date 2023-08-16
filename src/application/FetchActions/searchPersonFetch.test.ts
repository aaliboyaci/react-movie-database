import { fetchPersonSearch } from "./searchPersonFetch";
import { getSearchPerson } from "../../data-access/apiAccess";
import { SearchPersonDTO } from "../../data-access/searchPersonDTO";
import { mocked } from "jest-mock";
import { SearchPersonType } from "../Types/SearchPersonTypes";

jest.mock("../../data-access/apiAccess");
const mockedGetSearchPerson = mocked(getSearchPerson);

describe("fetchPersonSearch function", () => {
  test("fetches and processes person search correctly", async () => {
    // Sahte API yanıtı
    const mockPersonSearchResponse: SearchPersonDTO[] = [
      {
        id: 1,
        name: "Person 1",
        known_for_department: "Acting",
        profile_path: "path-to-profile1.jpg",
        popularity: 8.5,
      },
    ];

    mockedGetSearchPerson.mockResolvedValue(mockPersonSearchResponse);

    const personSearchResults: SearchPersonType[] = await fetchPersonSearch(
      1, // Örnek  pageno
      "John", // Örnek  query
      0 // Örnek searchSelect
    );

    expect(personSearchResults).toHaveLength(mockPersonSearchResponse.length);
    expect(personSearchResults[0].personID).toBe(
      mockPersonSearchResponse[0].id
    );
    expect(personSearchResults[0].personName).toBe(
      mockPersonSearchResponse[0].name
    );
  });

  test("handles errors correctly", async () => {
    const mockError = new Error("API error");

    mockedGetSearchPerson.mockRejectedValue(mockError);

    try {
      await fetchPersonSearch(1, "John", 0);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
