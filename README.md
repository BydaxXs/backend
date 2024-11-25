# backend
- Please create the variable DB_USER with the name of the user in the data base.
- Please create the variable DB_PASS with the password of the data base.
- Please create the variable DB_IPV4 with the IPV4 of the data base.
- Please create the variable DB_PORT with the port of the data base.
- Please create the variable IP_SERV with the server IP of the data base.
- Please create the variable API_VER with the value "ver2".
- Please create the variable KEY_PRI with the jwt key.
- Please create the variable DB_NAME with the databa base name.

Now please create a depto, a subdepto asociated to the depto by cost center link (use te field _id of the cost center) preferably Super Admin depto, a user role "admin" and a permisson "Super Admin" using the next structure

code : "111111"
namePermisson : "Jupiter"
postName : "Super Admin"

using the file "Insomnia export" (Import this file in insomnia software preferably)

After this create a first user preferably a super admin user

Please create a subdepto function asociated to the subdepto

Please create a action asociated to the subdepto function

Now you can create a view, please use the next list to use in the field frontpath:
- /TaxInsert (Tax Insert Page)
- /SearchTaxPage (Search Tax Docuemnt Page)
- /CreateDeliveryPage (Create Delivery Order Page)
- /SearchDeliveryPage (Search Delivery Order Page)
- /Assingment (Assingment Page)
- /CreateRequest (Create Request Page)
- /CreateProvider (Create Provider Page)
- /SearchProviderPage (Search Provider Page)
- /RegisterProduct (Register Product Page)
- /RegisterProviderContact (Register Provider Contact Page)
- /CreateCountryCommune (Create Country Commune Page)
- /CreateUser (Create User Page)
- /SearchRequest (Search Request Page)
- /AssingProductProvider (Assing Product Provider Page)
- /CreateView (Create View Page)
- /AssingUserMenu (Assing User Menu Page)
- /CreateDepto (Create Depto Page)
- /CreateSubdeptoFunction (Create Subdepto Function Page)

THIS FILED IS ASOCIATED TO THE WEBSITE OF THE APPLICATION, PLEASE DON'T CHANGE OR THE WEBSITE CAN'T BE RUN CORRECTLY 

Now you can assign views to users using the function "setUserMenu" use the user ID and the view ID
