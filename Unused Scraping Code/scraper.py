import time
import os
import json
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

def scrape_naukri():
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    driver.get("https://www.naukri.com/")

    search_input = driver.find_element(By.CSS_SELECTOR, 'input.suggestor-input')
    # search_input = driver.find_element(By.CSS_SELECTOR('input.suggestor-input'))
    search_input.send_keys("Machine Learning")

    search_button = driver.execute_script('return document.querySelector(".qsbSubmit");')
    driver.execute_script('arguments[0].click()', search_button)

    time.sleep(10)

    job_listing_link = driver.execute_script('return document.querySelector(".title");')
    driver.execute_script('arguments[0].click()', job_listing_link)

    # Extract job details (job name, location, apply link)
    job_details = driver.execute_script('return document.querySelector(".cTitle h1");')
    job_title = job_details.get_attribute("title")
    company_name = "Naukri"  

    driver.quit()

    return {'jobTitle': job_title, 'companyName': company_name, 'website': 'naukri.com'}

def scrape_indeed():
    options = webdriver.ChromeOptions()
    webdriver_service = Service('./chromedriver.exe')  
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    driver.get("https://in.indeed.com/")

    # enter the job type
    search_input = driver.execute_script('return document.getElementById("text-input-what")')
    driver.execute_script('arguments[0].value = "Machine Learning";', search_input)

    # enter the location
    search_input_where = driver.execute_script('return document.getElementById("text-input-where")')
    driver.execute_script('arguments[0].value = "Delhi";', search_input_where)

    # Click on the find jobs button
    jobs_button = driver.execute_script('return document.querySelector(".yosegi-InlineWhatWhere-primaryButton");')
    driver.execute_script('arguments[0].click()', jobs_button)

    time.sleep(10)
    driver.quit()

    return {'jobTitle': job_title, 'companyName': company_name, 'website': 'naukri.com'}

@app.route('/scrape', methods=['GET'])
def scrape_job_details():
    data = request.get_json()
    website = data.get('website')

    if website == 'naukri.com':
        job_details = scrape_naukri()
    elif website == 'indeed.com':
        job_details = scrape_indeed()
    else:
        return jsonify({'error': 'Invalid website'})
    
    return jsonify(job_details)

if __name__ == '__main__':
    app.run(debug=True)