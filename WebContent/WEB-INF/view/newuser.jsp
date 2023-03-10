<%@page import="java.net.URI"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<style>
.error{color:red}
</style>
</head>
<body>
WELCOME NEW USER

<form:form action="register-user" modelAttribute="user">

	First Name : <form:input path="firstName"/>
	<br><br>
	Last Name(*) : <form:input path="lastName"/>
	<form:errors path="lastName" cssClass="error"/> 
	<br><br>
	Age(*) : <form:input path="age"/>
	<form:errors path="age" cssClass="error"/> 
	<br><br>
	Male : <form:radiobutton path="gender" value="male"/>
	Female : <form:radiobutton path="gender" value="female"/>
	<br><br>
	<form:select path="country">
		<form:options items="${user.countryOptions}"/>
	</form:select>
	<br><br>
	ZipCode(*) : <form:input path="zipCode"/>
	<form:errors path="zipCode" cssClass="error"/> 
	<br><br>
	Agree to Terms and Conditions (Type Yes)(*) : <form:input path="yesval"/>
	<form:errors path="yesval" cssClass="error"/> 
	<input type="submit" value="Submit"/>
	</form:form>

</body>
</html>