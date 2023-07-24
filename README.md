# react-user-website
This is a React web interface fetching and sending data from and to an ASP.Net Core Web Api application running on .net 7.0, connected to a database stored in SQL Server 2019.

To run this program, please ensure to install recommended version of node.js and npm.

Steps to run program:
1. Restore 'project_DB.bak' to SQL Server 2019 database engine.

2. Once restored, open REST Api.sln in Visual Studio 2022. Two projects will be loaded into solution explorer.
   ![image](https://github.com/qarleeda/react-user-website/assets/140417696/f71d66e0-1afb-4354-8743-33795d582b8c)

3. Right click on 'Soluton "REST Api"' and click on Properties -> Common Properties -> Startup Projects -> select 'Multiple Startup Projects' -> set REST Api and User Web to 'Start' -> Apply -> Ok.
   ![image](https://github.com/qarleeda/react-user-website/assets/140417696/b59705f3-26c2-4bf4-ba86-fe5c62c20f3f)

4. Configure appSettings.json file in REST Api project and modify connection strings to map with your own configuration for SQL Server 2019.
   ![image](https://github.com/qarleeda/react-user-website/assets/140417696/a8a83eb4-cd64-4a20-84b4-21af51f760ae)

5. Rebuild solution by clicking on Build -> Rebuild Solution.

6. When rebuild is done, click on 'Start'. React web interface and REST Api connected to SQL Server 2019 will start running. Two browsers will pop up.
  ![image](https://github.com/qarleeda/react-user-website/assets/140417696/14ddc7ba-84db-4d7c-9cc4-18f73249ac89)
