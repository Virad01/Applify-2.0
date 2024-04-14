#Make sure you run chrome in remote debugging protocol first 
#google-chrome --remote-debugging-port=9222


import time
from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from flask import Flask,request
# from datetime import date
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
cred = credentials.Certificate('Server Side/applify-9f7a9-firebase-adminsdk-xbaza-bfa99362c4.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()


app = Flask(__name__)
# Date_app=date.today()
# def scrape_naukri():
#     options = Options()
#     options.add_argument('--headless')
#     driver = webdriver.Chrome(options=options)

def scrape_LinkedIn(jobUrl, id, Date_app):

    options = webdriver.ChromeOptions()
    options.add_experimental_option("debuggerAddress", "localhost:9222")
    driver=webdriver.Chrome(options=options)
    driver.get(url=jobUrl)
    if(jobUrl.startswith("https://www.linkedin.com/jobs/collections/")): 
        job_title=driver.find_element(By.XPATH,"//h2[@class='t-24 t-bold job-details-jobs-unified-top-card__job-title']")

        company_name=driver.find_element(By.XPATH,"//div[@class='job-details-jobs-unified-top-card__primary-description-without-tagline mb2']//a[@class='app-aware-link ']")
        
        dict={ 'uid':id,'jobTitle':job_title.text,'companyName': company_name.text, 'date':Date_app, 'status':'Open'}
        return(dict)

    elif(jobUrl.startswith("https://www.linkedin.com/jobs/view/")):
        time.sleep(5)
        job_title=driver.find_element(By.XPATH,"//h1[@class='t-24 t-bold job-details-jobs-unified-top-card__job-title']")

        company_name=driver.find_element(By.XPATH,"//div[@class='job-details-jobs-unified-top-card__primary-description-without-tagline mb2']//a[@class='app-aware-link ']")
        # driver.quit()
        # p1=job_title.text
        # print(type(p1))
        dict={ 'uid':id,'jobTitle':job_title.text,'companyName': company_name.text, 'date':Date_app, 'status':'Open'}
        return(dict)
    
# def scrape_LinkedIn(jobUrl):

#     options = webdriver.ChromeOptions()
#     options.add_experimental_option("debuggerAddress", "localhost:9222")
#     driver=webdriver.Chrome(options=options)
#     driver.get(url=jobUrl)
#     if(jobUrl.startswith("https://www.linkedin.com/jobs/collections/")): 
#         job_title=driver.find_element(By.XPATH,"//h2[@class='t-24 t-bold job-details-jobs-unified-top-card__job-title']")

#         company_name=driver.find_element(By.XPATH,"//div[@class='job-details-jobs-unified-top-card__primary-description-without-tagline mb2']//a[@class='app-aware-link ']")
        
#         dict={'jobTitle':job_title.text,'companyName': company_name.text, 'date':Date_app, 'uid':1001 }
#         return(dict)

#     elif(jobUrl.startswith("https://www.linkedin.com/jobs/view/")):
#         time.sleep(5)
#         job_title=driver.find_element(By.XPATH,"//h1[@class='t-24 t-bold job-details-jobs-unified-top-card__job-title']")

#         company_name=driver.find_element(By.XPATH,"//div[@class='job-details-jobs-unified-top-card__primary-description-without-tagline mb2']//a[@class='app-aware-link ']")
#         # driver.quit()
#         p1=job_title.text
#         print(type(p1))
#         dict={'jobTitle':job_title.text,'companyName': company_name.text, 'date':Date_app, 'uid':10001 }
#         return(dict)

def scrape_indeed(jobUrl,id, Date_app):

    options = webdriver.ChromeOptions()
    options.add_experimental_option("debuggerAddress", "localhost:9222")
    driver=webdriver.Chrome(options=options)
    driver.get(url=jobUrl)
    # job_title=driver.find_element(By.XPATH,"//h2[@class='jobsearch-JobInfoHeader-title css-jf6w2g e1tiznh50']")
    time.sleep(3)
    job_title=driver.find_element(By.XPATH,"//h2[contains(@class,'jobsearch-JobInfoHeader-title css')]")
    
    

    company_name=driver.find_element(By.XPATH,"//span[@class='css-1saizt3 e1wnkr790']")
        
    dict={ 'uid':id,'jobTitle':job_title.text,'companyName': company_name.text, 'date':Date_app, 'status':'Open'}
    return(dict)


@app.route('/scrape', methods=['GET','POST'])
def scrape_job_details():
    data = request.get_json()
    website = data['link']
    userID=data['uid']
    Date_app=str(datetime.datetime.now())
    if website.startswith("https://www.linkedin.com/jobs"):
        job_details = scrape_LinkedIn(website, userID, Date_app)
        # return(job_details)
        collection_ref=db.collection(str(job_details["uid"]))
        doc_ref=collection_ref.document(str(job_details["date"]))
        doc_ref.set(job_details)
        # jobData=db.collection("applify01").document(str(job_details["uid"]))
        # jobData.set(job_details, merge= True)
        return {"status":"200 OK"}
        
    elif website.startswith("https://in.indeed.com/"):
        job_details = scrape_indeed(website, userID, Date_app)
        # return(job_details)
        collection_ref=db.collection(str(job_details["uid"]))
        doc_ref=collection_ref.document(str(job_details["date"]))
        doc_ref.set(job_details)
        # jobData=db.collection("applify01").document(str(job_details["uid"]))
        # jobData.set(job_details, merge= True)
        return {"status":"200 OK"}
    # else:
    #     return jsonify({'error': 'Invalid website'})
if __name__ == '__main__':
    app.run(debug=True, port=2000)  