import requests
from bs4 import BeautifulSoup

def scrape_job_data():
    # Create a session object
    session = requests.Session()

    # URL to scrape (replace this with the actual URL of the job listings page)
    url = 'https://www.naukri.com/job-listings-diploma-mechanical-engineer-freshers-jobs-in-dubai-uae-art-technologies-chennai-tamil-nadu-dubai-uae-0-to-5-years-130124003599?src=jobsearchDesk&sid=17055766929609806&xp=1&px=1'

    try:
        # Send a GET request to the URL using the session object
        response = session.get(url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the HTML content of the page
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract job descriptions and profiles (replace these class names with the actual ones from the target website)
            job_descriptions = soup.find_all('div', class_='styles_JDC__dang-inner-html__h0K4t')
            profiles = soup.find_all('div', class_='styles_heading__veHpg')

            # Print the scraped data
            for description, profile in zip(job_descriptions, profiles):
                print(f'Job Description: {description.text.strip()}')
                print(f'Profile: {profile.text.strip()}')
                print('-' * 50)
        else:
            print(f'Failed to retrieve the page. Status code: {response.status_code}')
    except Exception as e:
        print(f'An error occurred: {e}')
    finally:
        # Close the session to release resources
        session.close()

if __name__ == "__main__":
    scrape_job_data()
