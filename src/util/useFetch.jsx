import React from 'react';

const useFetch = (url, options, refetch) => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setData(json);
          setLoading(false)
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, [refetch]);
    return { loading, error, data  };
};

export const useFetchAll = (urls, options, refetch) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      Promise.all(

        urls.map(url => fetch(url))
      ).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        setData(data);
        setLoading(false)
      }).catch(function (error) {
        // if there's an error, log it
        setError(error);
      });
    };
    fetchData();
  }, [refetch]);
  return { loading, error, data  };

}


export default useFetch;