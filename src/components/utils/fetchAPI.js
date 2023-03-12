import axios from 'axios';
async function fetchImg(search, page) {
    const BASE_URL = 'https://pixabay.com/api/?q='
    const KEY = '32970540-84e885805fcb13ea237a5964c'

      try {
    const response = await axios.get(`${BASE_URL}${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
          console.log(response);
          return response.data
  } catch (error) {
    console.error(error);
  }
}
export default fetchImg;