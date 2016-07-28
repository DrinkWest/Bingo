<%
    'CONFIGURATION
    database_source = ""
    database_database = ""
    database_user = ""
    database_password = ""

    conn = "Provider=SQLOLEDB.1;Persist Security Info=False;User ID=" & database_user & ";Password=" & database_password & ";Initial Catalog=" & database_database & ";Data Source=" & database_source & ";"
    set cmd = server.CreateObject("ADODB.Command")
	with cmd
		.ActiveConnection=conn
		.CommandType=4
		.CommandText="GetWords"
		.Parameters.Refresh
		Set rs = .Execute()
	end with
	set cmd = nothing
%>
<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Bingo</title>
    <script type="text/javascript" src="./js/game.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
</head>
<body>
    <table class="card" id="card0" border="1" cellspacing="0">
    <%
        rowNum = 0
        If NOT rs.EOF Then
            Do Until rs.EOF
                rowNum = rowNum + 1
                Select Case rowNum
                    Case 1
                        output = vbcrlf & vbcrlf & "<tr><td>" & rs("Word") & "</td>"
                    Case 6, 11, 16, 21
                        output = "</tr>" & vbcrlf & vbcrlf & "<tr><td>" & rs("Word") & "</td>"
                    Case 13
                        output = "<td class=""freecell"">FREE SQUARE</td>"
                    Case 25 
                        output = "<td>" & rs("Word") & "</td></tr>"
                    Case Else
                        output = "<td>" & rs("Word") & "</td>"
                End Select
                Response.Write output
                rs.MoveNext
            Loop
        Else
            Response.Write "Unable to get the board... try again"
        End If
    %>
    </table>
</body>
</html>
