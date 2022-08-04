

IF (OBJECT_ID('[dbo].[lecturer]') IS NOT NULL)
	DROP TABLE [dbo].[lecturer]
GO

IF (OBJECT_ID('[dbo].[studentcourse]') IS NOT NULL)
	DROP TABLE [dbo].[studentcourse]
GO

IF (OBJECT_ID('[dbo].[student]') IS NOT NULL)
	DROP TABLE [dbo].[student]
GO

IF (OBJECT_ID('[dbo].[course]') IS NOT NULL)
	DROP TABLE [dbo].[course]
GO

CREATE TABLE [dbo].[course]
(
	[id] int not null primary key identity(1,1),
	[name] nvarchar(30) not null,
	[description] nvarchar(max)
)

CREATE TABLE [dbo].[student]
(
	[id] int not null primary key identity(1,1),
	[fistname] nvarchar(30) not null,
	[lastname] nvarchar(30) not null
)

CREATE TABLE [dbo].[studentcourse]
(
	[studentId] int not null foreign key references [dbo].[student]([id]),
	[courseId] int not null foreign key references [dbo].[course]([id]),
	constraint [pk_student_course] primary key([studentId],[courseId])
)

CREATE TABLE [dbo].[lecturer]
(
	[id] int not null primary key identity(1,1),
	[fistname] nvarchar(30) not null,
	[lastname] nvarchar(30) not null,
	[course] int not null foreign key references [dbo].[course]([id])
)




IF (OBJECT_ID('[dbo].[sp_GetStudentByInstructor]') IS NOT NULL)
	DROP PROCEDURE [dbo].[sp_GetStudentByInstructor]
GO

CREATE PROCEDURE [dbo].[sp_GetStudentByInstructor]
	@lecturer int
AS
	SELECT s.[id],s.[fistname],s.[lastname]
	FROM [dbo].[student] s
	JOIN [dbo].[studentcourse] sc
	ON s.[id] = sc.studentId 
	JOIN [dbo].[course] c
	ON c.[id] = sc.[courseId]
	JOIN [dbo].[lecturer] l
	ON c.id = l.[course]
	WHERE l.id = @lecturer
GO



--INSERT INTO [dbo].[course] VALUES ('computer science','Four year BSc of comp science'),('marketing','Three year Dip in marketing science')


--INSERT INTO [dbo].[student] VALUES ('john','brit'),('jess','brick'),('toss','cannon')


--INSERT INTO [dbo].[student] VALUES ('dudu','myeni'),('duduzani','zuma'),('mbongeni','ngema')


--INSERT INTO [dbo].[student] VALUES ('sihle','zikalala'),('zanele','magwaza'),('zenzi','mandela')




--INSERT INTO [dbo].[studentcourse] VALUES (1,1),(1,2),(2,2),(3,2)



--INSERT INTO [dbo].[lecturer] VALUES ('vusi','thembekwayo',2),('dali','mpofu',1)




--exec [dbo].[sp_GetStudentByInstructor] 1











