class movieDisplay {
    constructor() {
      this.movies = [];
    }
  
    async createNewMovie(information, rating) {
      try {
        const response = await fetch('/addMovie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({information, rating})
        });
  
        if (!response.ok) {
          throw new Error('Error add Movie to the server');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async editMovie(title, field, newValue) {
        try {
            const response = await fetch('/editMovie', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, field, newValue })
            });
    
            if (!response.ok) {
                throw new Error('Error updating movie on the server');
            }
    
            // Handle the response here if needed
            const responseData = await response.json();
            console.log('Movie updated:', responseData);
            return responseData; // Return data or indicate success
        } catch (error) {
            console.error('Error updating movie:', error.message);
            throw error; // Rethrow the error or handle it appropriately
        }
    }

    async addRating(title, rating) {
        try {
            const response = await fetch('/addRating', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, rating })
            });
    
            if (!response.ok) {
                throw new Error('Error updating movie on the server');
            }
    
            // Handle the response here if needed
            const responseData = await response.json();
            console.log('Movie updated:', responseData);
            return responseData; // Return data or indicate success
        } catch (error) {
            console.error('Error updating movie:', error.message);
            throw error; // Rethrow the error or handle it appropriately
        }
    }

    async getMovie(id) {
        const response = await fetch(`/getMovie?id=${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not in JSON format');
        }
        const movieInfo = await response.json();
        return movieInfo;
    }

    async getGenre(genre) {
        const response = await fetch(`/getGenre?genre=${genre}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not in JSON format');
        }
        const movieInfo = await response.json();
        console.log(movieInfo)
        return movieInfo;
    }

    async getSimilar(type, title) {
        const response = await fetch(`/getSimilar?type=${type}&title=${title}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not in JSON format');
        }
        const movieInfo = await response.json();
        console.log(movieInfo)
        return movieInfo;
    }

    async getMyList(list) {
        const response = await fetch(`/getMyList?list=${list}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not in JSON format');
        }
        const movieInfo = await response.json();
        console.log(movieInfo)
        return movieInfo;
    }

    async getWhatsNew() {
        const response = await fetch('/whatsNew');
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not in JSON format');
        }
        const movieInfo = await response.json();
        return movieInfo;
    }

    async getAtoZ() {
        const response = await fetch('/atoz');
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not in JSON format');
        }
        const movieInfo = await response.json();
        return movieInfo;
    }
    
    async getRandom() {
        const response = await fetch(`/getRandom`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch movie: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        console.log(contentType)
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not in JSON format');
        }
        const movieInfo = await response.json();
        return movieInfo;
    }
}

export const showMovie = new movieDisplay();