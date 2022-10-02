---
title: Cloud provider service matrix
tags:
  - AWS
  - Azure
  - GCP
  - Cloud Platforms
categories:
  - Work_仕事
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: true
tocOpen: true
indexing: true
display_tag_onHome: true
recommendedSection: false
donate: true
geolocation: 'Chiba, Japan'
mathjax: false
share: false
copyright: true
copyLicense: false
copyLicenseURL: false
copyLicenseDesc: false
sourceUrl: false
sourceAuthor: false
sourceAuthorImg: false
sourcePublishDate: false
img: /2022/0601/Work_仕事/Cloud-provider-service-matrix/Big3CloudProviders.svg
openGraph_img: /2022/0601/Work_仕事/Cloud-provider-service-matrix/Big3CloudProviders.png
excerpt: >-
  List of similar services between the big 3 Cloud providers: Amazon Web
  Services, Microsoft Azure, & Google Cloud Platform. 
date: 2022-06-01 08:55:13
updated: 2022-06-01 08:55:13
---
## Introduction
I've worked for a number of enterprise companies within Japan and noticed many of their engineers don't know if a service on one cloud provider is transferable to another. [Reversibility](https://www.ibm.com/garage/method/practices/run/reversibility-in-the-cloud/) is important when a company desires to avoid vendor lock-in. If you are building a [FaaS](https://en.wikipedia.org/wiki/Function_as_a_service) based app, can you migrate it from Azure to AWS? (Or *vica-versa*?) With some planning and understanding of the services offered by the most mature Cloud providers below, there will probably be a path to make your migration possible.

Below is a matrix of services provided by AWS, Azure, and GCP. It's based on the solution documentation found for each cloud platform:
 * **AWS**: https://aws.amazon.com/products/
 * **Azure**: https://azure.microsoft.com/en-us/services/
 * **GCP**: https://cloud.google.com/products/

 Not all services are exactly alike. However, many of them offer equivalent functionality. Not all services provided by AWS are expected to be available on the other cloud platforms. Likewise, the other platforms may offer features not found on AWS. Items provided by Microsoft or Google such as *Microsoft 365* and *G Suite* are listed in parentheses `()`. Tools such as physical devices and SDK are not listed.


## Analytics
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Querying data lake | [Amazon Athena](https://aws.amazon.com/athena) | [Azure Synapse Analytics](https://docs.microsoft.com/en-us/azure/synapse-analytics/overview-what-is) <BR />[Azure Data Lake Analytics](https://azure.microsoft.com/services/data-lake-analytics) | [Google BigQuery](https://cloud.google.com/bigquery) |
| search | [Amazon CloudSearch](https://aws.amazon.com/cloudsearch) | [Azure Cognitive Search](https://azure.microsoft.com/services/search/) | |
| Hadoop clusters | [Amazon EMR](https://aws.amazon.com/emr) | [HDInsight](https://azure.microsoft.com/services/hdinsight) <BR /> [Azure Databricks](https://azure.microsoft.com/services/databricks) | [Dataproc](https://cloud.google.com/dataproc) |
| Deploying Elasticsearch clusters | [Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/) | [Elasticsearch Service on Elastic Cloud](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/elastic.elasticsearch) | [Elastic Cloud on GCP](https://console.cloud.google.com/marketplace/product/endpoints/elasticsearch-service.gcpmarketplace.elastic.co?pli=1) |
| Stream data processing | [Amazon Kinesis](https://aws.amazon.com/kinesis/) | [Azure Event Hubs](https://azure.microsoft.com/services/event-hubs) | [Cloud Dataflow](https://cloud.google.com/dataflow) |
| Kafka clusters | [Amazon Managed Streaming for Kafka](https://aws.amazon.com/msk/) | [HDInsight](https://azure.microsoft.com/services/hdinsight) | |
| Data WareHousing | [Amazon Redshift](https://aws.amazon.com/redshift) | [Azure Synapse Analytics](https://azure.microsoft.com/services/synapse-analytics/) | [Google BigQuery](https://cloud.google.com/bigquery) |
| Business Intelligence | [Amazon QuickSight](https://aws.amazon.com/quicksight/) | [(Power BI)](https://powerbi.microsoft.com/en-au/) | [Looker](https://cloud.google.com/looker) <BR /> [(Google DataPotal)](https://datastudio.google.com/overview) |
| Data workflow | [AWS Data Pipeline](https://aws.amazon.com/datapipeline) | [Azure Data Factory](https://azure.microsoft.com/services/data-factory) | | 
| Data Integration <BR /> ETL (Extract, Transform, Load) | [AWS Glue](https://aws.amazon.com/glue) | [Azure Data Factory](https://azure.microsoft.com/services/data-factory) | [Cloud Data Fusion](https://cloud.google.com/data-fusion) | 
| Data Lake automation | [AWS Lake Formation](https://aws.amazon.com/lake-formation/) | | |
| Data discovery and metadata management | [AWS Glue](https://aws.amazon.com/glue) | [Azure Purview](https://azure.microsoft.com/services/purview) <BR /> [Azure Data Catalog](https://docs.microsoft.com/en-us/azure/data-catalog/) | [Data Catalog](https://cloud.google.com/data-catalog) |
| 3rd-party data subscription | [AWS Data Exchange](https://aws.amazon.com/data-exchange/) | [Azure Data Share](https://azure.microsoft.com/services/data-share/) | [Analytics Hub](https://cloud.google.com/analytics-hub) |
| Data Preparation | [AWS Glue DataBrew](https://aws.amazon.com/glue/features/databrew/) | | [Dataprep by Trifacta](https://cloud.google.com/dataprep) |
| Financial services industry | [Amazon FinSpace](https://aws.amazon.com/finspace/)  | | |


## Application Integration
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Serverless workflow | [AWS Step Functions](https://aws.amazon.com/step-functions) | [Azure Logic Apps](https://azure.microsoft.com/services/logic-apps) | [Workflow](https://cloud.google.com/workflows) |
| Message queue | [Amazon Simple Queue Service](https://aws.amazon.com/sqs) | [Azure Queue Storage](https://azure.microsoft.com/services/storage/queues) | [Cloud Pub/Sub1](https://cloud.google.com/pubsub) |
| Publish / Subscribe | [Amazon Simple Queue Service](https://aws.amazon.com/sqs) | [Azure Service Bus](https://azure.microsoft.com/services/service-bus) | [Cloud Pub/Sub1](https://cloud.google.com/pubsub) |
| Message Brokering | [Amazon MQ](https://aws.amazon.com/amazon-mq/) | | |
| GraphQL | [AWS AppSync](https://aws.amazon.com/appsync/) | | |
| Event capture & delivery | [Amazon EventBridge](https://aws.amazon.com/eventbridge/) | [Event Grid](https://azure.microsoft.com/services/event-grid) | [Eventarc](https://cloud.google.com/eventarc/docs) |
| Job scheduling | [Amazon EventBridge](https://aws.amazon.com/eventbridge/) | [Azure Logic Apps](https://azure.microsoft.com/services/logic-apps) | [Cloud Scheduler](https://cloud.google.com/scheduler) |
| SaaS data flows | [Amazon AppFlow](https://aws.amazon.com/appflow/) | | |
| Workflow orchestration | [Amazon Managed Workflows for Apache Airflow](https://aws.amazon.com/managed-workflows-for-apache-airflow/) | [Azure Data Factory](https://azure.microsoft.com/services/data-factory) | [Cloud Composer](https://cloud.google.com/composer) |


## Blockchain
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Creating and managing networks | [Amazon Managed Blockchain](https://aws.amazon.com/managed-blockchain/) | [Azure Blockchain Service](https://azure.microsoft.com/en-us/solutions/blockchain/#overview) [RETIRED 2021] | |
| Ledger database | [Amazon Quantum Ledger Database](https://aws.amazon.com/qldb/) | | |
| Blockchain app build | | [Azure Blockchain Workbench](https://docs.microsoft.com/en-us/azure/blockchain/workbench/overview)  | |
| Token definition, creation and management | | [Azure Blockchain Workbench](https://docs.microsoft.com/en-us/azure/blockchain/workbench/overview)  | |



## Business Applications
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Alexa | [Alexa for Business](https://aws.amazon.com/alexaforbusiness/) | | |
| Online meeting | [Amazon Chime](https://aws.amazon.com/chime/) | [(Microsoft 365)](https://www.office.com/) | [(Google Workspace)](https://workspace.google.com/) |
| Communication service development | [Amazon Chime SDK](https://aws.amazon.com/chime/chime-sdk/) | [Azure Communication Services](https://azure.microsoft.com/en-us/services/communication-services/) | |
| Email | [Amazon WorkMail](https://aws.amazon.com/workmail/) | [(Microsoft 365)](https://www.office.com/) | [(Google Workspace)](https://workspace.google.com/) |
| No-Code | [Amazon Honeycode](https://www.honeycode.aws/) | [(PowerApps)](https://powerapps.microsoft.com/) | [AppSheet](https://cloud.google.com/appsheet) |


## Compute
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Virtual machine | [Amazon EC2](https://aws.amazon.com/ec2/) | [Azure Virtual Machines](https://azure.microsoft.com/services/virtual-machines/) | [Compute Engine](https://cloud.google.com/compute) |
| scaling | [Amazon EC2 Auto Scaling](https://aws.amazon.com/autoscaling/)  | [Virtual Machine Scale Sets](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-overview) | [Compute Engine Autoscaler](https://cloud.google.com/compute/docs/autoscaler) |
| [VPS](https://en.wikipedia.org/wiki/Virtual_private_server) | [Amazon Lightsail](https://aws.amazon.com/free/compute/lightsail/) | | |
| Batch computing | [AWS Batch](https://aws.amazon.com/batch/) | [Azure Batch](https://azure.microsoft.com/services/batch/) | [Cloud Tasks](https://cloud.google.com/tasks) |
| App environment | [Amazon Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) | [Azure App Service](https://azure.microsoft.com/services/app-service) | [App Engine](https://cloud.google.com/appengine) |
| FaaS | [AWS Lambda](https://aws.amazon.com/lambda/) | [Azure Functions](https://azure.microsoft.com/services/functions/) | [Cloud Functions](https://cloud.google.com/functions) |
| Serverless app repository | [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/)  | | |
| Deploy VMware | [VMware Cloud on AWS](https://aws.amazon.com/vmware/) | [Azure VMware Solution](https://azure.microsoft.com/en-us/services/azure-vmware/) | [Google Cloud VMware Engine](https://cloud.google.com/vmware-engine) |
| On-premises deployment | [AWS Outposts](https://aws.amazon.com/outposts/) | [Azure Stack](https://azure.microsoft.com/overview/azure-stack) | [Google Distributed Cloud](https://cloud.google.com/distributed-cloud) |
| Quantum computing | [Amazon Bracket](https://aws.amazon.com/braket/) | [Azure Quantum](https://azure.microsoft.com/en-us/services/quantum/) | |
| VM image automation | [EC2 Image Builder](https://aws.amazon.com/image-builder/) | [Azure Image Builder](https://azure.microsoft.com/en-us/services/image-builder/) | |
| Confidential computing environment | [AWS Nitro Enclaves](https://aws.amazon.com/ec2/nitro/nitro-enclaves/) | [Azure Confidential Computing](https://azure.microsoft.com/en-us/solutions/confidential-compute/) | [Confidential VMs](https://cloud.google.com/confidential-computing) |


## Containers
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Container orchestrator | [Amazon Elastic Container Service](https://aws.amazon.com/ecs/) | [Container Instances](https://azure.microsoft.com/services/container-instances/) | |
| Kubernetes | [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks/) | [Azure Kubernetes Service](https://azure.microsoft.com/services/kubernetes-service/) | [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) |
| Container registry | [Amazon Elastic Container Registry](https://aws.amazon.com/ecr/) | [Azure Container Registry](https://azure.microsoft.com/services/container-registry/) | [Artifact Registry](https://cloud.google.com/artifact-registry) |
| Container without instance management | [AWS Fargate](https://aws.amazon.com/fargate/) | [Service Fabric Mesh](https://docs.microsoft.com/en-us/azure/service-fabric-mesh/service-fabric-mesh-overview) | |
| Fully managed Containers without infrastructure | [AWS App Runner](https://aws.amazon.com/apprunner) | [Web App for Containers](https://azure.microsoft.com/services/app-service/containers) | [Cloud Run](https://cloud.google.com/run) |
| Containerization of existing apps | [AWS App2Container](https://aws.amazon.com/app2container/) | [Azure Migrate](https://azure.microsoft.com/services/azure-migrate) | [Migrate for Anthos](https://cloud.google.com/migrate/anthos) |
| Build a hybrid cloud | [Amazon ECS/EKS Anywhere](https://aws.amazon.com/eks/eks-anywhere/) | [Azure Arc](https://azure.microsoft.com/en-us/services/azure-arc/) | [Anthos](https://cloud.google.com/anthos) |
| OpenShift cluster | [Red Hat OpenShift Service on AWS](https://aws.amazon.com/quickstart/architecture/openshift/) | [Azure Red Hat OpenShift](https://azure.microsoft.com/en-us/services/openshift/) | [Red Hat OpenShift on GCP](https://cloud.google.com/architecture/partners/openshift-on-gcp) |


## Cost Management
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Visualization of usage | [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer) | [Azure Cost Management](https://azure.microsoft.com/services/cost-management) | [Cost Management](https://cloud.google.com/cost-management) |
| Budget management | [AWS Budgets](https://aws.amazon.com/aws-cost-management/aws-budgets/) | [Azure Cost Management](https://azure.microsoft.com/services/cost-management) | [Cloud Billing](https://cloud.google.com/billing/docs) |
| Manage Reserved Instances | [Reserved Instance Reporting](https://aws.amazon.com/aws-cost-management/reserved-instance-reporting/) | [Azure Cost Management](https://azure.microsoft.com/services/cost-management) | |
| Usage report | [AWS Cost & Usage Report](https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html) | [Azure Cost Management](https://azure.microsoft.com/services/cost-management) | [Cloud Billing](https://cloud.google.com/billing/docs) |
| Compute usage savings | [Savings Plans](https://aws.amazon.com/savingsplans/) | | |



## Customer Engagement
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Contact center | [Amazon Connect](https://aws.amazon.com/connect/) | | |
| Contact center analysis | [Contact Lens for Amazon Connect](https://aws.amazon.com/connect/contact-lens/) | | [Contact Center AI Insights](https://cloud.google.com/solutions/contact-center/) |
| Engagement personalization | [Amazon Pinpoint](https://aws.amazon.com/pinpoint/) | [Notification Hubs](https://azure.microsoft.com/en-us/services/notification-hubs/) | |
| Sending and receiving emails | [Amazon Simple Email Service](https://aws.amazon.com/ses/) | | |


## Database
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| MySQL | [Amazon RDS for MySQL](https://aws.amazon.com/rds/mysql/) <BR /> [Amazon Aurora](https://aws.amazon.com/rds/aurora/) | [Azure Database for MySQL](https://azure.microsoft.com/en-us/free/mysql/) | [Cloud SQL for MySQL](https://cloud.google.com/sql/docs/mysql) |
| PostgreSQL | [Amazon RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/) <BR /> [Amazon Aurora](https://aws.amazon.com/rds/aurora/) | [Azure Database for PostgreSQL](https://azure.microsoft.com/en-us/services/postgresql/) | [Cloud SQL for PostgreSQL](https://cloud.google.com/sql/docs/postgres) |
| Oracle | [Amazon RDS for Oracle](https://aws.amazon.com/rds/oracle/) | | |
| SQL Server | [Amazon RDS for SQL Server](https://aws.amazon.com/rds/sqlserver/) | [SQL Database]() | [Cloud SQL for SQL Server](https://cloud.google.com/sql/docs/sqlserver) |
| MariaDB | [Amazon RDS for MariaDB](https://aws.amazon.com/rds/mariadb/) | [Azure Database for MariaDB](https://azure.microsoft.com/services/mariadb) | |
| NoSQL | [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) | [Azure Cosmos DB](https://azure.microsoft.com/services/cosmos-db) | [Cloud Datastore](https://cloud.google.com/datastore) <BR /> [Cloud Bigtable](https://cloud.google.com/bigtable) |
| Memcached | [Amazon ElastiCache for Memcached](https://aws.amazon.com/memcached/) | | [Memorystore for Memcached](https://cloud.google.com/memorystore/) |
| Redis | [Amazon ElastiCache for Redis](https://aws.amazon.com/elasticache) | [Azure Cache for Redis](https://azure.microsoft.com/services/cache) | [Memorystore for Redis](https://cloud.google.com/memorystore) |
| Graph DB | [Amazon Neptune](https://aws.amazon.com/neptune/) | [Azure Cosmos DB(API for Gremlin)](https://docs.microsoft.com/en-us/azure/cosmos-db/graph/graph-introduction) | |
| time series DB | [Amazon Timestream](https://aws.amazon.com/timestream) | [Azure Time Series Insights](https://aws.amazon.com/timestream) | |
| MongoDB | [Amazon DocumentDB (with MongoDB compatibility)](https://docs.aws.amazon.com/documentdb/latest/developerguide/compatibility.html) | [Azure Cosmos DB(MongoDB API)](https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb/mongodb-introduction) | |
| Cassandra | [Amazon Keyspaces (for Apache Cassandra)](https://aws.amazon.com/keyspaces/) | [Azure Managed Instance for Apache Cassandra](https://docs.microsoft.com/en-us/azure/managed-instance-apache-cassandra/) | |
| Globally distributed RDB | | | [Cloud Spanner](https://cloud.google.com/spanner) |
| Real-time DB | | | [Firestore](https://cloud.google.com/firestore) |


## Developer Tools
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Management of coding projects | [AWS CodeStar](https://aws.amazon.com/codestar/) | [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) | |
| Git repository | [AWS CodeCommit](https://aws.amazon.com/codecommit/) | [Azure Repos](https://azure.microsoft.com/en-us/services/devops/repos/) <BR /> [(GitHub)](https://Github.com) | [Cloud Source Repositories](https://source.cloud.google.com/) |
| Continuous build & testing [CI/CD] | [AWS CodeBuild](https://aws.amazon.com/codebuild) | [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) | [Cloud Build](https://cloud.google.com/build) |
| Continuous deployment | [AWS CodeDeploy](https://aws.amazon.com/codedeploy) | [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) | [Cloud Build](https://cloud.google.com/build) <BR /> [Google Cloud Deploy](https://cloud.google.com/deploy) |
| Pipelines | [AWS CodePipeline](https://aws.amazon.com/codepipeline) | [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/) | [Cloud Build](https://cloud.google.com/build) <BR /> [Google Cloud Deploy](https://cloud.google.com/deploy) |
| Work & team tracking | | [Azure Boards](https://azure.microsoft.com/en-us/services/devops/boards/) | |
| Package registry | [AWS CodeArtifact](https://aws.amazon.com/codeartifact/) | [Azure Artifacts](https://azure.microsoft.com/en-us/services/devops/artifacts/) | [Artifact Registry](https://cloud.google.com/artifact-registry) |
| Manage test plans | | [Azure Test Plans](https://azure.microsoft.com/en-us/services/devops/test-plans/) | |
| IDE | [AWS Cloud9](https://aws.amazon.com/cloud9/) | [Visual Studio Codespaces](https://visualstudio.microsoft.com/services/github-codespaces/) | [Cloud Shell Code editor](https://cloud.google.com/shell/docs/editor-overview) |
| Distributed tracing | [AWS X-Ray](https://aws.amazon.com/xray/) | [Azure Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview) | [Cloud Trace](https://cloud.google.com/trace) |
| Browser-based shell | [AWS CloudShell](https://aws.amazon.com/cloudshell/) | [Azure Cloud Shell](https://azure.microsoft.com/en-us/features/cloud-shell/) | [Cloud Shell](https://cloud.google.com/shell) |
| Chaos engineering | [AWS Fault Injection Simulator](https://aws.amazon.com/fis/) | [Azure Chaos Studio](https://azure.microsoft.com/en-us/services/chaos-studio/) | |



## End User Computing
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Desktop | [Amazon WorkSpaces](https://aws.amazon.com/workspaces/) | [Azure Virtual Desktop](https://azure.microsoft.com/en-us/free/virtual-desktop/) | |
| Application streaming | [Amazon AppStream 2.0](https://aws.amazon.com/appstream2/) | | |
| Storage | [Amazon WorkDocs](https://aws.amazon.com/workdocs/) | [(Microsoft 365)](https://www.office.com/) | [(Google Workspace)](https://workspace.google.com/) |
| Access to in-house applications | [Amazon WorkLink](https://aws.amazon.com/workspaces/web/) | [Azure AD Application Proxy](https://docs.microsoft.com/en-us/azure/active-directory/app-proxy/application-proxy) | [Cloud Identity-Aware Proxy](https://cloud.google.com/iap/) |


## Front-End Web & Mobile
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Build and deploy mobile / web applications | [AWS Amplify](https://aws.amazon.com/amplify) | [Mobile Apps](https://azure.microsoft.com/en-us/services/app-service/mobile/) | [(Firebase)](https://firebase.google.com/) |
| Application test | [AWS Device Farm](https://aws.amazon.com/device-farm/) | [(Visual Studio App Center)](https://appcenter.ms/) | [(Firebase Test Lab)](https://firebase.google.com/docs/test-lab) |


## Internet of Things
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Device-cloud connection | [AWS IoT Core](https://aws.amazon.com/iot-core) | [Azure IoT Hub](https://azure.microsoft.com/services/iot-hub) | [Cloud IoT Core](https://cloud.google.com/iot) |
| Edge Deployment | [AWS Greengrass](https://aws.amazon.com/greengrass/) | [Azure IoT Hub](https://azure.microsoft.com/services/iot-hub) | [Cloud IoT Core](https://cloud.google.com/iot) |
| Execute any function from the device | [AWS IoT 1-Click](https://aws.amazon.com/iot-1-click/)  | | |
| Device analysis | [AWS IoT Analytics](https://aws.amazon.com/iot-analytics/) | [Azure Stream Analytics](https://azure.microsoft.com/services/stream-analytics) <BR /> [Azure Time Series Insights](https://azure.microsoft.com/services/time-series-insights) | |
| Device security management | [AWS IoT Device Defender](https://aws.amazon.com/iot-device-defender/) | | |
| Device management | [AWS IoT Device Management](https://aws.amazon.com/iot-device-management/) | [Azure IoT Hub](https://azure.microsoft.com/services/iot-hub) | [Cloud IoT Core](https://cloud.google.com/iot) |
| Detection of events occurring on the device | [AWS IoT Events](https://aws.amazon.com/iot-events/) | | |
| Collect data from industrial equipment | [AWS IoT SiteWise](https://aws.amazon.com/iot-sitewise/) | | |
| Building IoT applications | [AWS IoT Things Graph](https://aws.amazon.com/iot-things-graph/) | [Azure Digital Twins](https://azure.microsoft.com/services/digital-twins) | |
| Digital twin | [AWS IoT TwinMaker](https://aws.amazon.com/iot-twinmaker/) | [Azure Digital Twins](https://azure.microsoft.com/services/digital-twins) | |
| Location intelligence | [Amazon Location Service](https://aws.amazon.com/location/) | [Azure Maps](https://azure.microsoft.com/en-us/services/azure-maps/) | [Google Maps Platform](https://mapsplatform.google.com/) |
| Edge located DB | | [Azure SQL Edge](https://azure.microsoft.com/en-us/products/azure-sql/edge/) | |
| Collection of vehicle data | [AWS IoT FleetWise](https://aws.amazon.com/iot-fleetwise/) | | |
| Build a robot fleet management application | [AWS IoT RoboRunner](https://aws.amazon.com/roborunner/) | | |


## Machine Learning
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| ML modeling | [Amazon SageMaker](https://aws.amazon.com/sagemaker) | [Azure Machine Learning](https://azure.microsoft.com/services/machine-learning-services) | [Vertex AI](https://cloud.google.com/vertex-ai) |
| Build the workflow needed to review ML predictions | [Amazon Augmented AI](https://aws.amazon.com/augmented-ai/)  | | |
| Automatic code review | [Amazon Code Guru](https://aws.amazon.com/codeguru/) | | |
| Natural language processing | [Amazon Comprehend](https://aws.amazon.com/comprehend/) <BR > [Amazon Comprehend Medical](https://aws.amazon.com/comprehend/medical/) | [Language Understanding](https://azure.microsoft.com/services/cognitive-services/language-understanding-intelligent-service) | [Cloud Natural Language](https://cloud.google.com/natural-language) |
| Fraud detection | [Amazon Fraud Detector](https://aws.amazon.com/fraud-detector/) | | |
| Storage and analysis of health data | [Amazon HealthLake](https://aws.amazon.com/healthlake/) | [Azure API for FHIR](https://docs.microsoft.com/en-us/azure/healthcare-apis/azure-api-for-fhir/overview) | [Cloud Healthcare API](https://cloud.google.com/healthcare-api) |
| Enterprise search | [Amazon Kendra](https://aws.amazon.com/kendra/) | [Azure Cognitive Search](https://azure.microsoft.com/services/search/) | |
| Chatbot | [Amazon Lex](https://aws.amazon.com/lex) | [Azure Bot Service](https://azure.microsoft.com/en-us/services/bot-services/) | [Dialogflow](https://cloud.google.com/dialogflow) |
| Text-to-Speech | [Amazon Polly](https://aws.amazon.com/polly) | [Speech Services](https://azure.microsoft.com/services/cognitive-services/speech) | [Text-to-Speech](https://cloud.google.com/text-to-speech) |
| Speech-to-Text | [Amazon Transcribe](https://aws.amazon.com/transcribe) | [Speech Services](https://azure.microsoft.com/services/cognitive-services/speech) | [Cloud Speech-to-Text](https://cloud.google.com/speech-to-text) |
| Image recognition | [Amazon Rekognition](https://aws.amazon.com/rekognition) | [Computer Vision](https://azure.microsoft.com/services/cognitive-services/computer-vision/) | [Vision AI](https://cloud.google.com/vision) |
| Translation | [Amazon Translate]() | [Translator Text](https://azure.microsoft.com/en-us/services/cognitive-services/translator/) | [Translation AI](https://cloud.google.com/translate) |
| Recommendation | [Amazon Personalize](https://aws.amazon.com/personalize/) | [Personalizer](https://azure.microsoft.com/en-us/services/cognitive-services/personalizer/) | [Recommendations AI](https://cloud.google.com/recommendations) |
| Time series forecast | [Amazon Forecast](https://aws.amazon.com/forecast/) | | |
| Document comprehension | [Amazon Textract](https://aws.amazon.com/textract/) | [Azure Form Recognizer](https://azure.microsoft.com/en-us/services/form-recognizer/) | [Document AI](https://cloud.google.com/document-ai) |
| Fast Inference | [Amazon Elastic Inference](https://aws.amazon.com/machine-learning/elastic-inference/) | | [Cloud TPU](https://cloud.google.com/tpu) |
| Deep Learning | [Deep Learning with TensorFlow](https://aws.amazon.com/tensorflow/) | | [Tensorflow Enterprise](https://cloud.google.com/tensorflow-enterprise) |
| Dataset construction | [Amazon SageMaker Ground Truth](https://aws.amazon.com/sagemaker/data-labeling/) | [Azure Machine Learning data labeling](https://azure.microsoft.com/en-us/services/machine-learning/) | [Vertex Data Labeling](https://cloud.google.com/vertex-ai/docs/datasets/data-labeling-job) |
| Notebooks | [Amazon SageMaker Studio Notebooks](https://docs.aws.amazon.com/sagemaker/latest/dg/notebooks.html) | [Azure Machine Learning](https://azure.microsoft.com/en-us/services/machine-learning/) | [Vertex AI Workbench](https://cloud.google.com/vertex-ai-workbench) |
| Preparation of ML data | [Amazon SageMaker Data Wrangler](https://aws.amazon.com/sagemaker/data-wrangler/) | | |
| Machine learning operations (MLOps) | [Amazon SageMaker for ML Engineers](https://aws.amazon.com/sagemaker/mlops/) | | |
| Vision model customization | [Amazon Rekognition Custom Labels](https://aws.amazon.com/rekognition/custom-labels-features/) | [Custom Vision](https://azure.microsoft.com/en-us/services/cognitive-services/custom-vision-service/) | [Cloud AutoML Vision](https://cloud.google.com/vision/) |
| Voice model customization | | [Custom Speech](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/custom-speech-overview) | |
| Language processing model customization | [Amazon Comprehend](https://aws.amazon.com/comprehend/) | | [Cloud AutoML Natural Language](https://cloud.google.com/natural-language/) |
| Translation model customization | [Amazon Translate Custom Terminology](https://docs.aws.amazon.com/translate/latest/dg/how-custom-terminology.html) | [Translator Text Custom Translator](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/customization) | [Cloud AutoML Translation](https://cloud.google.com/translate/automl/docs) |
| Cloud operation utilizing ML | [Amazon DevOps Guru](https://aws.amazon.com/devops-guru/) | | |
| Sensor anomaly detection analysis | [Amazon Lookout for Equipment](https://aws.amazon.com/lookout-for-equipment/) | | |
| Product defect detection | [Amazon Lookout for Vision](https://aws.amazon.com/lookout-for-vision/) | | |
| Anomaly detection of time series data | [Amazon Lookout for Metrics](https://aws.amazon.com/lookout-for-metrics/) | [Anomaly Detector](https://azure.microsoft.com/en-us/services/cognitive-services/anomaly-detector/) | |
| End-to-end industrial equipment monitoring | [Amazon Monitron](https://aws.amazon.com/monitron/) | | |
| Computer vision at the edge | [AWS Panorama](https://aws.amazon.com/panorama/) | [Azure Percept](https://azure.microsoft.com/en-us/services/azure-percept/) | |
| Virtual machine image for deep learning | [AWS Deep Learning AMIs](https://aws.amazon.com/machine-learning/amis/) | [Data Science Virtual Machines](https://azure.microsoft.com/en-us/services/virtual-machines/data-science-virtual-machines/) | [Deep Learning VM Image](https://cloud.google.com/deep-learning-vm) |
| Container image for deep learning | [AWS Deep Learning Containers](https://aws.amazon.com/machine-learning/containers/) | | [Deep Learning Containers](https://docs.microsoft.com/en-us/azure/machine-learning/concept-prebuilt-docker-images-inference) |


## Management & Governance
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Monitoring | [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) | [Azure Monitor](https://azure.microsoft.com/en-us/services/monitor/) | [Cloud Monitoring](https://cloud.google.com/monitoring) |
| Creating and managing resources | [AWS CloudFormation](https://aws.amazon.com/cloudformation/) | [Azure Resource Manager](https://azure.microsoft.com/features/resource-manager) | [Cloud Deployment Manager](https://cloud.google.com/deployment-manager/docs) |
| Activity tracking | [AWS CloudTrail](https://aws.amazon.com/cloudtrail) | [Azure Activity Log](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log) | [Cloud Audit Logs](https://cloud.google.com/audit-logs) |
| Recording and auditing resource configuration changes | [AWS Config](https://aws.amazon.com/config/) | | [Cloud Asset Inventory](https://cloud.google.com/asset-inventory) |
| Configuration management services | [AWS OpsWorks](https://aws.amazon.com/opsworks/) (Chef / Puppet) | | |
| IT service catalog management | [AWS Service Catalog](https://aws.amazon.com/servicecatalog) | [Azure Managed Applications](https://docs.microsoft.com/en-us/azure/azure-resource-manager/managed-applications/overview) | [Private Catalog](https://cloud.google.com/private-catalog) |
| Infrastructure visibility and control | [AWS Systems Manager](https://aws.amazon.com/systems-manager) | [Azure Automanage](https://azure.microsoft.com/en-us/services/azure-automanage/) | [VM Manager](https://cloud.google.com/compute/docs/vm-manager) |
| Performance & security optimization | [AWS Trusted Advisor](https://aws.amazon.com/premiumsupport/technology/trusted-advisor) | [Azure Advisor](https://azure.microsoft.com/services/advisor) | [Recommender](https://cloud.google.com/recommender) |
| Status of service utilization | [AWS Personal Health Dashboard](https://aws.amazon.com/premiumsupport/technology/personal-health-dashboard) | [Azure Resource Health](https://docs.microsoft.com/en-us/azure/resource-health/resource-health-overview)  ||
| Criteria compliant account setup | [AWS Control Tower](https://aws.amazon.com/controltower) | [Azure Blueprints](https://docs.microsoft.com/en-us/azure/governance/blueprints) | [Policy Intelligence](https://cloud.google.com/policy-intelligence) | 
| License management | [AWS License Manager](https://aws.amazon.com/license-manager/) | | |
| Infrastructure management by cloud provider | [AWS Managed Services](https://aws.amazon.com/managed-services/) | | |
| Review and improve workloads | [AWS Well-Architected Tool](https://aws.amazon.com/well-architected-tool/) | | |
| Manage multiple accounts | [AWS Organizations](https://aws.amazon.com/organizations) | [Azure Management Group](https://docs.microsoft.com/en-us/azure/governance/management-groups) | [Resource Manager](https://cloud.google.com/resource-manager) |
| Private SSH / RDP connection | [AWS Systems Manager - Session Manager](https://aws.amazon.com/systems-manager/#Session_Manager) | [Azure Bastion](https://azure.microsoft.com/en-us/services/azure-bastion/#overview) | [Cloud Identity-Aware Proxy](https://cloud.google.com/iap) |
| ChatOps | [AWS Chatbot](https://aws.amazon.com/chatbot/) | | |
| Parameter store | [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | [App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview) | |
| Moving resources | | [Azure Resource Mover](https://docs.microsoft.com/en-us/azure/resource-mover/overview) | |
| Manage container / serverless deployments | [Amazon Proton](https://aws.amazon.com/proton/) | | |
| Grafana | [Amazon Managed Service for Grafana](https://aws.amazon.com/grafana/) | [Azure Managed Grafana](https://azure.microsoft.com/en-us/services/managed-grafana/) | |
| Prometheus | [Amazon Managed Service for Prometheus](https://aws.amazon.com/prometheus/) | | [Google Cloud Managed Service for Prometheus](https://cloud.google.com/stackdriver/docs/managed-prometheus) |


## Media Services
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Media conversion | [Amazon Elastic Transcoder](https://aws.amazon.com/elastictranscoder) <BR /> [AWS Elemental MediaConvert](https://aws.amazon.com/mediaconvert/) | [Azure Media Services - Encoding](https://azure.microsoft.com/en-us/services/media-services/encoding/) | [Transcoder API](https://cloud.google.com/transcoder/docs) |
| Live video processing | [AWS Elemental MediaLive](https://aws.amazon.com/medialive/) | [Azure Media Services - Live and On-demand Streaming](https://azure.microsoft.com/ja-jp/services/media-services/live-on-demand/) | ([Anvato](https://cloud.google.com/solutions/media-entertainment/)) |
| Live streaming delivery | [Amazon Interactive Video Service](https://aws.amazon.com/ivs/) | | |
| Video distribution and packaging | [AWS Elemental MediaPackage](https://aws.amazon.com/mediapackage/) | [Azure Media Services](https://azure.microsoft.com/en-us/services/media-services/) | ([Anvato](https://cloud.google.com/solutions/media-entertainment/)) |
| Storage for video files | [AWS Elemental MediaStore](https://aws.amazon.com/mediastore/) | | |
| Inserting targeted ads | [AWS Elemental MediaTailor](https://aws.amazon.com/mediatailor/) | | |
| Digital content creation studio | [Amazon Nimble Studio](https://aws.amazon.com/nimble-studio/) | | |


## Migration & Transfer
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Manage migration | [AWS Migration Hub](https://aws.amazon.com/migration-hub/) | | |
| Transition assessment | [AWS Application Discovery Service](https://aws.amazon.com/application-discovery/) | [Azure Migrate](https://azure.microsoft.com/services/azure-migrate) | |
| Database migration | [AWS Database Migration Service](https://aws.amazon.com/dms) | [Azure Database Migration Service](https://azure.microsoft.com/campaigns/database-migration) | [Database Migration Service](https://cloud.google.com/database-migration) |
| Data transfer from on-premises | [AWS DataSync](https://aws.amazon.com/datasync/) | [Azure File Sync](https://docs.microsoft.com/en-us/azure/storage/files/storage-sync-files-planning) | |
| Server migration | [AWS Application Migration Service](https://aws.amazon.com/application-migration-service/) <BR /> [AWS Server Migration Service](https://aws.amazon.com/server-migration-service/) | [Azure Migrate](https://azure.microsoft.com/services/azure-migrate) | [Migrate for Compute Engine](https://cloud.google.com/migrate/compute-engine) |
| Disaster recovery | [AWS Elastic Disaster Recovery](https://aws.amazon.com/disaster-recovery/) | [Azure Site Recovery](https://azure.microsoft.com/en-us/services/site-recovery/) | |
| Migration of large volumes of data | [Snowball](https://aws.amazon.com/snowball/) <BR /> [Snowball Edge](https://aws.amazon.com/snowball-edge/) <BR /> [Snowmobile](https://aws.amazon.com/snowmobile/) | [Azure Data box](https://azure.microsoft.com/services/storage/databox/) | [Transfer Appliance](https://cloud.google.com/transfer-appliance/) |
| Data sharing between companies - SFTP/FTP/FTPS | [AWS Transfer Family](https://aws.amazon.com/aws-transfer-family/) | | ([FileMage](https://console.cloud.google.com/marketplace/details/filemage-public/filemage-gateway-linux)) |
| Data transfer between clouds | | | [Cloud Storage Transfer Service](https://cloud.google.com/storage-transfer-service) |
| Mainframe modernization | [AWS Mainframe Modernization](https://aws.amazon.com/mainframe-modernization/) | | |


## Networking & Content Delivery
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Virtual network | [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc/) | [Virtual Private Cloud](https://cloud.google.com/vpc) <BR /> [Azure Virtual Network](https://azure.microsoft.com/services/virtual-network) | [Cloud Virtual Private Network](https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview) |
| API management | [Amazon API Gateway](https://aws.amazon.com/api-gateway) | [API Apps](https://azure.microsoft.com/en-us/services/app-service/api/) <BR /> [API Management](https://azure.microsoft.com/services/api-management) | [API Gateway](https://cloud.google.com/api-gateway) <BR /> [Cloud Endpoints](https://cloud.google.com/endpoints/) <BR /> [Apigee](https://cloud.google.com/apigee) |
| CDN | [Amazon CloudFront](https://aws.amazon.com/cloudfront) | [Azure CDN](https://azure.microsoft.com/pricing/details/cdn) | [Cloud CDN](https://cloud.google.com/cdn) |
| DNS | [Amazon Route 53](https://aws.amazon.com/route53) | [Azure DNS](https://azure.microsoft.com/services/dns/) | [Cloud DNS](https://cloud.google.com/dns) <BR /> [Cloud Domains](https://cloud.google.com/domains/docs/overview) |
| Private connection | [Amazon VPC PrivateLink](https://aws.amazon.com/privatelink) | [Azure Private Link](https://azure.microsoft.com/services/private-link) | [Private Access Options for Services](https://cloud.google.com/vpc/docs/configure-private-google-access) |
| Service mesh | [AWS App Mesh](https://aws.amazon.com/app-mesh/) | [Azure Service Fabric Mesh](https://docs.microsoft.com/en-us/azure/service-fabric-mesh/service-fabric-mesh-overview) | [Traffic Director](https://cloud.google.com/traffic-director) |
| Service discovery | [AWS Cloud Map](https://aws.amazon.com/cloud-map/) | | [Service discovery](https://docs.microsoft.com/en-us/azure-sphere/app-development/service-discovery) |
| Leased line connection | [AWS Direct Connect](https://aws.amazon.com/directconnect/) | [Azure ExpressRoute](https://azure.microsoft.com/services/expressroute) | [Cloud Interconnect](https://cloud.google.com/network-connectivity/docs/interconnect) |
| DNS load balancing | [Amazon Route 53](https://aws.amazon.com/route53) | [Azure Traffic Manager](https://azure.microsoft.com/services/traffic-manager) | [Cloud DNS](https://cloud.google.com/dns) |
| Global endpoint | [AWS Global Accelerator](https://aws.amazon.com/global-accelerator) | [Azure Front Door](https://azure.microsoft.com/services/frontdoor) | [Cloud Load Balancing](https://cloud.google.com/load-balancing) |
| Hub & spoke network connection | [AWS Transit Gateway](https://aws.amazon.com/transit-gateway/) | [Azure Virtual Network Manager](https://azure.microsoft.com/en-us/services/virtual-network-manager/) | |
| Network performance monitoring | [AWS Transit Gateway Network Manager](https://aws.amazon.com/transit-gateway/network-manager/) | [Network Watcher](https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-monitoring-overview) | [Network Intelligence Center](https://cloud.google.com/network-intelligence-center) |
| Building a global wide area network | [AWS Cloud WAN](https://aws.amazon.com/cloud-wan/) | [Azure Virtual WAN](https://docs.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about) | [Network Connectivity Center](https://cloud.google.com/network-connectivity-center) |
| Build private 5G | [AWS Private 5G](https://aws.amazon.com/private5g/) | [Azure Private 5G core](https://azure.microsoft.com/en-us/services/private-5g-core/) | |


## Security, Identity & Compliance
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Identity management | [AWS Identity and Access Management](https://aws.amazon.com/iam/) | [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/) | [IAM](https://cloud.google.com/iam) |
| Hierarchical data store | [Amazon Cloud Directory](https://aws.amazon.com/cloud-directory/) | | |
| Analysis and visualization of security data | [Amazon Detective](https://aws.amazon.com/detective/) | | |
| Application access management | [Amazon Cognito](https://aws.amazon.com/cognito/) | [Azure Active Directory B2C](https://azure.microsoft.com/services/active-directory-b2c) | [Identity Platform](https://cloud.google.com/identity-platform) |
| Threat detection | [Amazon GuardDuty](https://aws.amazon.com/guardduty/) | [Azure Advanced Threat Protection](https://azure.microsoft.com/features/azure-advanced-threat-protection) | [Security Command Center](https://cloud.google.com/security-command-center) |
| Server security assessment | [Amazon Inspector](https://aws.amazon.com/inspector) | [Microsoft Defender for Cloud](https://azure.microsoft.com/services/security-center) | [Security Command Center](https://cloud.google.com/security-command-center) |
| Detection and protection of sensitive data | [Amazon Macie](https://aws.amazon.com/macie/) | [Azure Information Protection](https://azure.microsoft.com/en-us/solutions/information-protection/) | [Cloud Data Loss Prevention](https://cloud.google.com/dlp) |
| Access to compliance reports | [AWS Artifact](https://aws.amazon.com/artifact/) | ([Service Trust Portal](https://servicetrust.microsoft.com/)) | [Compliance Reports Manager](https://cloud.google.com/security/compliance/compliance-reports-manager) |
| SSL / TLS certificate management | [AWS Certificate Manager](https://aws.amazon.com/certificate-manager) | [App Service Certificates](https://azure.microsoft.com/blog/internals-of-app-service-certificate) | [Certificate Authority Service](https://cloud.google.com/certificate-authority-service) |
| Private CA | [AWS Certificate Manager Private Certificate Authority](https://aws.amazon.com/certificate-manager/private-certificate-authority/) | | [Certificate Authority Service](https://cloud.google.com/certificate-authority-service) |
| Hardware security module | [AWS CloudHSM](https://aws.amazon.com/cloudhsm/) | [Azure Dedicated HSM](https://azure.microsoft.com/en-us/services/azure-dedicated-hsm/) | [Cloud HSM](https://cloud.google.com/kms/docs/hsm) |
| Active Directory | [AWS Directory Service](https://aws.amazon.com/directoryservice/) | [Azure Active Directory Domain Services](https://azure.microsoft.com/en-us/services/active-directory/) | [Managed Service for Microsoft Active Directory](https://cloud.google.com/managed-microsoft-ad) |
| Centralized management of firewall rules | [AWS Firewall Manager](https://aws.amazon.com/firewall-manager/) | [Azure Firewall Manager](https://azure.microsoft.com/en-us/services/firewall-manager/) | |
| Key creation and management | [AWS Key Management Service](https://aws.amazon.com/kms) | [Azure Key Vault](https://azure.microsoft.com/services/key-vault) | [Cloud Key Management Service](https://cloud.google.com/security-key-management) |
| Management of confidential information | [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) | [Azure Key Vault](https://azure.microsoft.com/services/key-vault) | [Secret Manager](https://cloud.google.com/secret-manager) |
| Centralized management of security information | [AWS Security Hub](https://aws.amazon.com/security-hub/) | [Microsoft Sentinel](https://azure.microsoft.com/en-us/services/microsoft-sentinel/) | [Security Command Center](https://cloud.google.com/security-command-center) |
| DDoS protection | [AWS Shield](https://aws.amazon.com/shield) | [Azure DDoS Protection](https://docs.microsoft.com/en-us/azure/security/fundamentals/ddos-best-practices) | [Cloud Armor](https://cloud.google.com/armor) |
| Single sign-on | [AWS Single Sign-On](https://aws.amazon.com/single-sign-on/) | [Azure Active Directory B2C](https://azure.microsoft.com/services/active-directory-b2c) | [Cloud Identity](https://cloud.google.com/identity/) |
| Web App Firewall | [AWS WAF](https://aws.amazon.com/waf/) | [Azure Application Gateway](https://azure.microsoft.com/services/application-gateway) | [Cloud Armor](https://cloud.google.com/armor) |
| Virtual network firewall | [AWS Network Firewall](https://aws.amazon.com/network-firewall/) | [Azure Firewall](https://azure.microsoft.com/services/azure-firewall) | |
| Continuous usage audit | [AWS Audit Manager](https://aws.amazon.com/audit-manager/) | | |
| Intrusion detection system | [AWS Shield - Advanced](https://aws.amazon.com/shield/features/#AWS_Shield_Advanced) | [Azure Firewall](https://azure.microsoft.com/services/azure-firewall) | [Cloud IDS](https://cloud.google.com/intrusion-detection-system) |



## Storage
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Object storage | [Amazon S3](https://aws.amazon.com/s3/) | [Azure Blob](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction) | [Cloud Storage](https://cloud.google.com/storage) |
| Block storage | [Amazon EBS](https://aws.amazon.com/ebs/) | [Managed Disk](https://azure.microsoft.com/services/storage/disks/) | [Persistent Disk](https://cloud.google.com/persistent-disk) |
| File storage (NFS) | [Amazon Elastic File System](https://aws.amazon.com/efs/) | [Azure Files](https://azure.microsoft.com/services/storage/files/) | [Cloud Filestore](https://cloud.google.com/filestore) |
| File storage (SMB) | [Amazon FSx for Windows File Server](https://aws.amazon.com/fsx/windows/) | [Azure Files](https://azure.microsoft.com/services/storage/files/) | |
| NetApp ONTAP | [Amazon FSx for NetApp ONTAP](https://aws.amazon.com/fsx/netapp-ontap/) | [Azure NetApp Files](https://azure.microsoft.com/en-us/services/netapp/) | |
| File system for HPC | [Amazon FSx for Lustre](https://aws.amazon.com/fsx/lustre/) | [Azure FXT Edge Filer](https://docs.microsoft.com/en-us/azure/fxt-edge-filer/overview) | |
| OpenZFS | [Amazon FSx for OpenZFS](https://aws.amazon.com/fsx/openzfs/) | | |
| Archive storage | [Amazon S3 Glacier](https://aws.amazon.com/s3/glacier/) | [Storage archive access tier](https://docs.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview) | [Cloud Storage Coldline](https://cloud.google.com/storage/docs/storage-classes#coldline) |
| Centralized backup management | [AWS Backup](https://aws.amazon.com/backup/) | [Azure Backup](https://azure.microsoft.com/en-us/services/backup/) | |
| Hybrid storage | [AWS Storage Gateway](https://aws.amazon.com/storagegateway/) | [Azure StorSimple](https://azure.microsoft.com/services/storsimple/) | |
| Disaster recovery | [AWS Elastic Disaster Recovery](https://aws.amazon.com/disaster-recovery/) | [Azure Site Recovery](https://azure.microsoft.com/en-us/services/site-recovery/) | |


## others
| | AWS | Azure | GCP |
| :-- | :-- | :-- | :-- |
| Creating AR / VR content | [Amazon Sumerian](https://aws.amazon.com/sumerian/) | [Azure Spatial Anchors](https://azure.microsoft.com/ja-jp/services/spatial-anchors/) | |
| Game server hosting | [Amazon GameLift](https://aws.amazon.com/gamelift/) | [Azure PlayFab](https://azure.microsoft.com/en-us/services/playfab/) | [Google Cloud Game Servers](https://cloud.google.com/game-servers) |
| Game engine | [Amazon Lumberyard](https://aws.amazon.com/lumberyard/) | | |
| Robotics | [AWS RoboMaker](https://aws.amazon.com/robomaker/) | | |
| satellite | [AWS Ground Station](https://aws.amazon.com/ground-station/) | [Azure Orbital](https://azure.microsoft.com/en-us/services/orbital/) | |
| Visualize Cloud's entire Architecture | [AWS Perspective](https://aws.amazon.com/solutions/implementations/aws-perspective/) ** | | |

** Perspective is not an AWS service, but rather a *native* built solution employing AWS services. For a platform agnostic solution, [LucidScale](https://lucidscale.com/) offers a lot of excellent features that support AWS, Azure, and GCP. 


## Reference
* [AWS to Azure services comparison](https://docs.microsoft.com/en-us/azure/architecture/aws-professional/services)
* [Google Cloud Platform for AWS Professionals](https://cloud.google.com/docs/compare/aws)