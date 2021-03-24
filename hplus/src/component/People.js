import React, {useState, useEffect} from 'react';
import {API, graphqlOperation}  from 'aws-amplify';
import PersonCard from './PersonCard'
// import peopleData from './data/people.json'

const listPersons = `
  query ListPersons{
    listPersons {
      items {
        id
        fullName
        dynamicSlug
        title
        description
      }
    }
  }
`

const People = () => {
  const [peopleData, setPeopleData] = useState([]);

  const loadPersonData = async() => {
    const { data } = await API.graphql(
      graphqlOperation(listPersons)
    );
    setPeopleData(data?.listPersons?.items);
  }

useEffect(() => {
  loadPersonData();
}, [])

  return (
    <section id="people" className="section">
      <header className="imageheader"></header>
      <div className="container">
        <h2 className="headline">People</h2>
        <div className="people-cards">
          {
            peopleData.map((person) => 
              <PersonCard dynamicSlug={`${person.dynamicSlug}`}
                          fullName={`${person.fullName}`}
                          title={`${person.title}`}
                          description={`${person.description}`}
              />)
          }
        </div>
      </div>
    </section>
  );
}

export default People;