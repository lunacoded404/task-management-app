--
-- PostgreSQL database dump
--

\restrict Mfb9AweAG4q6wmQQ9IdWPJk44R8p621sTk4V11IcYF4I3Gofh2dwGKSXsyklrwB

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-11 04:13:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5203 (class 0 OID 25693)
-- Dependencies: 226
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- TOC entry 5199 (class 0 OID 25671)
-- Dependencies: 222
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	group
3	auth	permission
4	contenttypes	contenttype
5	sessions	session
6	users	user
7	tasks	category
8	tasks	stickynote
9	tasks	subtask
10	tasks	tag
11	tasks	task
12	tasks	tasktag
13	tasks	viewsetting
\.


--
-- TOC entry 5201 (class 0 OID 25683)
-- Dependencies: 224
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	3	add_permission
6	Can change permission	3	change_permission
7	Can delete permission	3	delete_permission
8	Can view permission	3	view_permission
9	Can add group	2	add_group
10	Can change group	2	change_group
11	Can delete group	2	delete_group
12	Can view group	2	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add user	6	add_user
22	Can change user	6	change_user
23	Can delete user	6	delete_user
24	Can view user	6	view_user
25	Can add category	7	add_category
26	Can change category	7	change_category
27	Can delete category	7	delete_category
28	Can view category	7	view_category
29	Can add sticky note	8	add_stickynote
30	Can change sticky note	8	change_stickynote
31	Can delete sticky note	8	delete_stickynote
32	Can view sticky note	8	view_stickynote
33	Can add tag	10	add_tag
34	Can change tag	10	change_tag
35	Can delete tag	10	delete_tag
36	Can view tag	10	view_tag
37	Can add task	11	add_task
38	Can change task	11	change_task
39	Can delete task	11	delete_task
40	Can view task	11	view_task
41	Can add sub task	9	add_subtask
42	Can change sub task	9	change_subtask
43	Can delete sub task	9	delete_subtask
44	Can view sub task	9	view_subtask
45	Can add task tag	12	add_tasktag
46	Can change task tag	12	change_tasktag
47	Can delete task tag	12	delete_tasktag
48	Can view task tag	12	view_tasktag
49	Can add view setting	13	add_viewsetting
50	Can change view setting	13	change_viewsetting
51	Can delete view setting	13	delete_viewsetting
52	Can view view setting	13	view_viewsetting
\.


--
-- TOC entry 5205 (class 0 OID 25703)
-- Dependencies: 228
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- TOC entry 5207 (class 0 OID 25740)
-- Dependencies: 230
-- Data for Name: users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, firebase_uid, avatar, created_at, updated_at) FROM stdin;
1		\N	f	hrkii4nHjjc12MMT6umnJcqVb7m2			arichansts@gmail.com	f	t	2026-09-05 13:23:52.770831+07	hrkii4nHjjc12MMT6umnJcqVb7m2	\N	2026-09-05 13:23:52.7712+07	2026-09-05 13:23:52.77121+07
\.


--
-- TOC entry 5213 (class 0 OID 25812)
-- Dependencies: 236
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- TOC entry 5197 (class 0 OID 25659)
-- Dependencies: 220
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2026-09-05 13:21:41.646653+07
2	contenttypes	0002_remove_content_type_name	2026-09-05 13:21:41.667676+07
3	auth	0001_initial	2026-09-05 13:21:41.747556+07
4	auth	0002_alter_permission_name_max_length	2026-09-05 13:21:41.754885+07
5	auth	0003_alter_user_email_max_length	2026-09-05 13:21:41.762037+07
6	auth	0004_alter_user_username_opts	2026-09-05 13:21:41.769968+07
7	auth	0005_alter_user_last_login_null	2026-09-05 13:21:41.778639+07
8	auth	0006_require_contenttypes_0002	2026-09-05 13:21:41.781287+07
9	auth	0007_alter_validators_add_error_messages	2026-09-05 13:21:41.788382+07
10	auth	0008_alter_user_username_max_length	2026-09-05 13:21:41.795281+07
11	auth	0009_alter_user_last_name_max_length	2026-09-05 13:21:41.802445+07
12	auth	0010_alter_group_name_max_length	2026-09-05 13:21:41.813326+07
13	auth	0011_update_proxy_permissions	2026-09-05 13:21:41.820042+07
14	auth	0012_alter_user_first_name_max_length	2026-09-05 13:21:41.826825+07
15	users	0001_initial	2026-09-05 13:21:41.902572+07
16	admin	0001_initial	2026-09-05 13:21:41.934073+07
17	admin	0002_logentry_remove_auto_add	2026-09-05 13:21:41.956201+07
18	admin	0003_logentry_add_action_flag_choices	2026-09-05 13:21:42.040987+07
19	sessions	0001_initial	2026-09-05 13:21:42.060445+07
20	tasks	0001_initial	2026-09-05 13:22:04.946723+07
21	tasks	0002_viewsetting	2026-09-06 00:59:03.104432+07
22	tasks	0003_tag_background_color	2026-09-06 03:31:06.26398+07
23	tasks	0004_alter_stickynote_options_and_more	2026-09-07 02:22:23.396656+07
24	tasks	0005_task_is_calendar_event	2026-09-08 11:52:43.5724+07
\.


--
-- TOC entry 5214 (class 0 OID 25838)
-- Dependencies: 237
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- TOC entry 5216 (class 0 OID 25851)
-- Dependencies: 239
-- Data for Name: tasks_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks_category (id, name, user_id) FROM stdin;
1	personal	1
2	work	1
3	order	1
\.


--
-- TOC entry 5218 (class 0 OID 25860)
-- Dependencies: 241
-- Data for Name: tasks_stickynote; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks_stickynote (id, title, content, created_at, updated_at, user_id, color) FROM stdin;
1	Weekly Goals	<p>Finish the Django backend API, review React components, and exercise at least 3 times this week.</p>	2026-09-11 01:20:27.788415+07	2026-09-11 01:20:27.788433+07	1	#3dffdf
2	Grocery Shopping	<p>Buy milk, eggs, fresh vegetables, chicken breasts, and coffee beans from the supermarket.</p>	2026-09-11 01:21:00.570104+07	2026-09-11 01:21:00.570121+07	1	#ece06f
3	Meeting Notes	<p>Discuss timeline updates with the team, check responsive UI bugs on mobile, and deploy the staging version by Friday.</p>	2026-09-11 01:21:14.563104+07	2026-09-11 01:21:14.563118+07	1	#3dbeff
4	Project Ideas	<p>Build a personal expense tracker app using React, Tailwind CSS, and Python Django REST framework.</p>	2026-09-11 01:21:30.226689+07	2026-09-11 01:21:30.226706+07	1	#e83dff
5	Quick Reminders	<p>Call the mechanic for motorbike maintenance, pay the monthly electricity bill, and water indoor plants.</p>	2026-09-11 01:21:45.33977+07	2026-09-11 01:21:45.33979+07	1	#ff8b3d
\.


--
-- TOC entry 5222 (class 0 OID 25884)
-- Dependencies: 245
-- Data for Name: tasks_task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks_task (id, title, description, due_date, start_time, end_time, is_completed, background_color, created_at, updated_at, category_id, user_id, is_calendar_event) FROM stdin;
1	Complete Q3 project progress report	Finalize the Q3 project progress report and submit it to the manager.	2026-09-11	08:30:00	23:00:00	f	#12544F	2026-09-11 01:07:19.825114+07	2026-09-11 01:07:19.825133+07	2	1	f
2	Receive office supplies delivery	Receive the ordered office supplies package from the e-commerce platform.	2026-09-11	11:30:00	12:00:00	f	#FFCB56	2026-09-11 01:08:12.69015+07	2026-09-11 01:08:12.690167+07	3	1	f
3	Evening gym workout session	Schedule an evening gym session to maintain health and relieve stress.	2026-09-11	18:00:00	19:30:00	f	#722F99	2026-09-11 01:09:22.105584+07	2026-09-11 01:09:22.105597+07	1	1	f
4	Review cart payment price calculation code	Review the price calculation logic of the shopping cart payment module.	2026-09-11	13:30:00	15:30:00	f	#3368A0	2026-09-11 01:10:09.885404+07	2026-09-11 01:10:09.885418+07	2	1	f
5	Clean up workspace desk	Clean up the work desk and organize personal documents.	2026-09-11	16:30:00	17:15:00	f	#8B2626	2026-09-11 01:10:58.218502+07	2026-09-11 01:10:58.218518+07	1	1	f
6	Online meeting with international partners	Hold an online meeting with international partners to finalize feature modification requirements.	2026-09-12	09:00:00	10:30:00	f	#EEEEEE	2026-09-11 01:12:14.097585+07	2026-09-11 01:12:21.417972+07	2	1	f
7	Order weekly fresh groceries	Order fresh food and cooking ingredients for the entire week.	2026-09-12	00:00:00	00:30:00	f	#F5788B	2026-09-11 01:13:13.747169+07	2026-09-11 01:13:13.747184+07	3	1	f
8	Finish reading self-development book chapter 4	Finish reading chapter 4 of the ongoing self-improvement book.	2026-09-12	21:00:00	22:00:00	f	#8B2626	2026-09-11 01:14:06.800393+07	2026-09-11 01:14:06.800408+07	1	1	f
9	Fix mobile responsive UI bugs for admin page	Fix responsive UI display errors on mobile screens for the admin panel.	2026-09-12	14:00:00	16:30:00	f	#3368A0	2026-09-11 01:14:53.546096+07	2026-09-11 01:14:53.546109+07	2	1	f
10	Regular motorcycle maintenance service	Take the motorbike for routine maintenance at the authorized service center.	2026-09-12	15:30:00	17:00:00	f	#722F99	2026-09-11 01:15:46.38877+07	2026-09-11 01:15:46.388783+07	1	1	f
12	Design database schema for user roles and permissions	Build the database structure for the new user permission management feature.	2026-09-13	09:00:00	12:00:00	f	#8B2626	2026-09-11 01:18:40.180736+07	2026-09-11 01:19:22.285282+07	2	1	f
\.


--
-- TOC entry 5226 (class 0 OID 25910)
-- Dependencies: 249
-- Data for Name: tasks_subtask; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks_subtask (id, title, is_completed, created_at, updated_at, task_id) FROM stdin;
\.


--
-- TOC entry 5220 (class 0 OID 25875)
-- Dependencies: 243
-- Data for Name: tasks_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks_tag (id, name, user_id, background_color) FROM stdin;
1	Important	1	#3b82f6
2	Urgent	1	#10b981
3	Optional	1	#8b5cf6
\.


--
-- TOC entry 5224 (class 0 OID 25901)
-- Dependencies: 247
-- Data for Name: tasks_task_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks_task_tags (id, task_id, tag_id) FROM stdin;
1	1	2
2	2	1
3	3	3
4	4	2
5	5	3
6	6	1
7	7	3
8	8	3
9	9	2
10	10	1
12	12	1
\.


--
-- TOC entry 5228 (class 0 OID 25922)
-- Dependencies: 251
-- Data for Name: tasks_tasktag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks_tasktag (id, tag_id, task_id) FROM stdin;
\.


--
-- TOC entry 5230 (class 0 OID 26165)
-- Dependencies: 253
-- Data for Name: tasks_viewsetting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks_viewsetting (id, view_name, background_color, user_id) FROM stdin;
1	tomorrow	#3368A0	1
3	this_week	#722F99	1
2	today	#FFCB56	1
\.


--
-- TOC entry 5209 (class 0 OID 25764)
-- Dependencies: 232
-- Data for Name: users_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- TOC entry 5211 (class 0 OID 25773)
-- Dependencies: 234
-- Data for Name: users_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- TOC entry 5236 (class 0 OID 0)
-- Dependencies: 225
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- TOC entry 5237 (class 0 OID 0)
-- Dependencies: 227
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- TOC entry 5238 (class 0 OID 0)
-- Dependencies: 223
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 52, true);


--
-- TOC entry 5239 (class 0 OID 0)
-- Dependencies: 235
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- TOC entry 5240 (class 0 OID 0)
-- Dependencies: 221
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 13, true);


--
-- TOC entry 5241 (class 0 OID 0)
-- Dependencies: 219
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 24, true);


--
-- TOC entry 5242 (class 0 OID 0)
-- Dependencies: 238
-- Name: tasks_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_category_id_seq', 3, true);


--
-- TOC entry 5243 (class 0 OID 0)
-- Dependencies: 240
-- Name: tasks_stickynote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_stickynote_id_seq', 5, true);


--
-- TOC entry 5244 (class 0 OID 0)
-- Dependencies: 248
-- Name: tasks_subtask_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_subtask_id_seq', 27, true);


--
-- TOC entry 5245 (class 0 OID 0)
-- Dependencies: 242
-- Name: tasks_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_tag_id_seq', 4, true);


--
-- TOC entry 5246 (class 0 OID 0)
-- Dependencies: 244
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_task_id_seq', 12, true);


--
-- TOC entry 5247 (class 0 OID 0)
-- Dependencies: 246
-- Name: tasks_task_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_task_tags_id_seq', 12, true);


--
-- TOC entry 5248 (class 0 OID 0)
-- Dependencies: 250
-- Name: tasks_tasktag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_tasktag_id_seq', 1, false);


--
-- TOC entry 5249 (class 0 OID 0)
-- Dependencies: 252
-- Name: tasks_viewsetting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_viewsetting_id_seq', 3, true);


--
-- TOC entry 5250 (class 0 OID 0)
-- Dependencies: 231
-- Name: users_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_groups_id_seq', 1, false);


--
-- TOC entry 5251 (class 0 OID 0)
-- Dependencies: 229
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- TOC entry 5252 (class 0 OID 0)
-- Dependencies: 233
-- Name: users_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_user_permissions_id_seq', 1, false);


-- Completed on 2026-09-11 04:13:41

--
-- PostgreSQL database dump complete
--

\unrestrict Mfb9AweAG4q6wmQQ9IdWPJk44R8p621sTk4V11IcYF4I3Gofh2dwGKSXsyklrwB

