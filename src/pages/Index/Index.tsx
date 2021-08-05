import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   addNewTodo,
   completeSelectedTodo,
   deleteSelectedTodo,
   generateTodoLink,
   getTodo,
   unCompleteSelectedTodo,
   updateSelectedTodo,
} from '../../redux/actions/todo'
import { RootState } from '../../redux/store'
import {
   Button,
   Typography,
   Modal,
   TextField,
   Checkbox,
   TableContainer,
   Paper,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   CardContent,
   Card,
   Snackbar,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import UpdateIcon from '@material-ui/icons/Update'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import useStylesIndex from './styles.index'
import { ITodo } from '../../redux/reducers/todos'
import { useHistory } from 'react-router-dom'
import { clearNotification } from '../../redux/actions/notification'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props: any) {
   return <MuiAlert elevation={6} variant="filled" {...props} />
}

export interface TodoData {
   title: string
   description: string
}

export const Index = () => {
   const classes = useStylesIndex()
   const dispatch = useDispatch()
   const history = useHistory()

   const getTodos = useCallback(() => {
      dispatch(getTodo())
   }, [])

   useEffect(() => {
      getTodos()
   }, [getTodos])

   const isLoading = useSelector((state: RootState) => state.todo.isLoading)
   const todos = useSelector((state: RootState) => state.todo.todos)
   const link = useSelector((state: RootState) => state.todo.link)

   const completedArray = todos.filter((todo) => todo.status == true)
   const noCompletedArray = todos.filter((todo) => todo.status == false)

   const [openTodoInputModal, setOpenTodoInputModal] = useState(false)
   const [todoDataOpen, setTodoDataOpen] = useState(false)
   const [linkOpen, setLinkOpen] = useState(false)

   const [modalHeader, setModalHeader] = useState('')
   let [modalType, setModalType] = useState('')
   let [todoData, setTodoData] = useState({
      id: 0,
      index: 0,
   })

   const [titleError, setTitleError] = useState('')
   const [descriptionError, setDescriptionError] = useState('')
   const [clickTitleInput, setClickTitleInput] = useState(false)
   const [clickDescriptionInput, setClickDescriptionInput] = useState(false)

   const [todo, setTodo] = useState({
      title: '',
      description: '',
      status: '',
      completedDate: '',
      date: '',
   })

   const [todoDataForm, setTodoDataForm] = useState({
      title: '',
      description: '',
   })

   const [formValid, setFormValid] = useState(false)

   const showTodoData = (
      title: string,
      description: string,
      status: boolean,
      completedDate: string,
      date: string
   ) => {
      setTodoDataOpen(true)
      let Status = !status ? 'not completed' : 'completed'
      let CompletedDate = completedDate == ' ' ? 'no date' : completedDate
      setTodo({
         ...todo,
         title: title,
         description: description,
         status: Status,
         completedDate: CompletedDate,
         date: date,
      })
   }

   const closeTodoData = () => {
      setTodoDataOpen(false)

      setTodo({
         ...todo,
         title: '',
         description: '',
         status: '',
         completedDate: '',
         date: '',
      })
   }

   const closeLink = () => {
      setLinkOpen(false)
   }

   const openInputModal = () => {
      setOpenTodoInputModal(true)
   }

   const closeInputModal = () => {
      setOpenTodoInputModal(false)
      setModalHeader('')
      setTodoDataForm({
         ...todoDataForm,
         title: '',
         description: '',
      })
      setModalType('')
      setTodoData({
         ...todoData,
         id: 0,
         index: 0,
      })
      setDescriptionError('')
      setTitleError('')
      setFormValid(false)
      setClickTitleInput(false)
      setClickDescriptionInput(false)
   }

   const addTodoRequest = () => {
      dispatch(addNewTodo(todoDataForm, todos))
      setOpenTodoInputModal(false)
   }

   const deleteTodoRequest = (id: number, index: number) => {
      dispatch(deleteSelectedTodo(id, todos, index))
   }

   const updateTodoRequest = (id: number, index: number) => {
      dispatch(updateSelectedTodo(id, todos, index, todoDataForm))
   }

   const completeTodoRequest = (id: number, todo: ITodo, index: number) => {
      dispatch(completeSelectedTodo(id, todos, index, todo))
   }

   const unCompleteTodoRequest = (id: number, todo: ITodo, index: number) => {
      dispatch(unCompleteSelectedTodo(id, todos, index, todo))
   }

   const generateLink = (id: number) => {
      dispatch(generateTodoLink(id))
   }
   const [open, setOpen] = React.useState(false)

   const noteClose = (event: any, reason: any) => {
      if (reason === 'clickaway') {
         return
      }
      setOpen(false)
      dispatch(clearNotification())
   }
   function textToClipboard(text: string) {
      let dummy = document.createElement('textarea')
      document.body.appendChild(dummy)
      dummy.value = text
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
   }
   useEffect(() => {
      if (open) {
         textToClipboard(link)
      }
   }, [open])

   return (
      <>
         <div className={classes.note}>
            <Snackbar open={open} autoHideDuration={2000} onClose={noteClose}>
               <Alert onClose={noteClose} severity="info">
                  Copied
               </Alert>
            </Snackbar>
         </div>
         <Card>
            <CardContent>
               <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
               >
                  <Button
                     style={{
                        marginTop: '10px',
                        marginLeft: '10px',
                        background: '#28A745',
                        color: '#fff',
                     }}
                     onClick={() => {
                        openInputModal()
                        setModalHeader('Adding new todo')
                        setModalType('add-todo')
                     }}
                  >
                     + Add new todo
                  </Button>
                  <Button
                     style={{
                        marginTop: '10px',
                        marginLeft: '10px',
                        background: '#666c75',
                        color: '#fff',
                     }}
                     onClick={() => {
                        history.push('/chat')
                     }}
                  >
                     Help & Support
                  </Button>
               </div>
            </CardContent>
         </Card>

         {noCompletedArray.length > 0 && (
            <TableContainer component={Paper}>
               <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell>
                           <strong>
                              <CheckIcon />
                           </strong>
                        </TableCell>
                        <TableCell>
                           <strong>TITLE</strong>
                        </TableCell>
                        <TableCell>
                           <strong>UPDATE</strong>
                        </TableCell>
                        <TableCell>
                           <strong>DELETE</strong>
                        </TableCell>
                        <TableCell>
                           <strong>GENERATE LINK</strong>
                        </TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {!isLoading &&
                        todos.map((todo) => {
                           if (!todo.status) {
                              return (
                                 <TableRow key={todo.title}>
                                    <TableCell component="th" scope="row">
                                       <Checkbox
                                          color="primary"
                                          inputProps={{
                                             'aria-label': 'secondary checkbox',
                                          }}
                                          onClick={() => {
                                             completeTodoRequest(
                                                todo.id,
                                                todo,
                                                todos.indexOf(todo)
                                             )
                                          }}
                                       />
                                    </TableCell>
                                    <TableCell
                                       component="th"
                                       scope="row"
                                       className={classes.showTodoData}
                                       onClick={() => {
                                          showTodoData(
                                             todo.title,
                                             todo.description,
                                             todo.status,
                                             todo.completedDate,
                                             todo.date
                                          )
                                       }}
                                    >
                                       {todo.title}
                                       <ArrowDropDownIcon />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                       <Button
                                          className={classes.updateTodoButton}
                                          onClick={() => {
                                             setModalHeader('Update this todo')
                                             setTodoDataForm({
                                                ...todoDataForm,
                                                title: todo.title,
                                                description: todo.description,
                                             })
                                             setModalType('update-todo')
                                             setTodoData({
                                                ...todoData,
                                                id: todo.id,
                                                index: todos.indexOf(todo),
                                             })
                                             openInputModal()
                                             setFormValid(true)
                                          }}
                                       >
                                          <UpdateIcon />
                                       </Button>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                       <Button
                                          className={classes.deleteTodoButton}
                                          onClick={() => {
                                             deleteTodoRequest(
                                                todo.id,
                                                todos.indexOf(todo)
                                             )
                                          }}
                                       >
                                          <HighlightOffIcon />
                                       </Button>
                                    </TableCell>
                                    <TableCell>
                                       <FileCopyIcon
                                          style={{ cursor: 'pointer' }}
                                          onClick={() => {
                                             generateLink(todo.id)
                                             console.log(todo.id)
                                             setLinkOpen(true)
                                             setOpen(true)
                                          }}
                                       />
                                    </TableCell>
                                 </TableRow>
                              )
                           }
                        })}
                  </TableBody>
               </Table>
            </TableContainer>
         )}

         {completedArray.length > 0 && (
            <>
               <h1>Completed</h1>
               <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <TableCell>
                              <strong>
                                 <SwapHorizIcon />
                              </strong>
                           </TableCell>
                           <TableCell>
                              <strong>TITLE</strong>
                           </TableCell>
                           <TableCell>
                              <strong>DELETE</strong>
                           </TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {!isLoading &&
                           completedArray.map((todo) => {
                              if (todo.status) {
                                 return (
                                    <TableRow key={todo.title}>
                                       <TableCell>
                                          <KeyboardBackspaceIcon
                                             className={
                                                classes.unCompleteTodoButton
                                             }
                                             onClick={() => {
                                                unCompleteTodoRequest(
                                                   todo.id,
                                                   todo,
                                                   todos.indexOf(todo)
                                                )
                                             }}
                                          />
                                       </TableCell>
                                       <TableCell
                                          component="th"
                                          scope="row"
                                          className={classes.showTodoData}
                                          onClick={() => {
                                             showTodoData(
                                                todo.title,
                                                todo.description,
                                                todo.status,
                                                todo.completedDate,
                                                todo.date
                                             )
                                          }}
                                       >
                                          {todo.title}
                                          <ArrowDropDownIcon />
                                       </TableCell>
                                       <TableCell component="th" scope="row">
                                          <Button
                                             className={
                                                classes.deleteTodoButton
                                             }
                                             onClick={() => {
                                                deleteTodoRequest(
                                                   todo.id,
                                                   todos.indexOf(todo)
                                                )
                                             }}
                                          >
                                             <HighlightOffIcon />
                                          </Button>
                                       </TableCell>
                                    </TableRow>
                                 )
                              }
                           })}
                     </TableBody>
                  </Table>
               </TableContainer>
            </>
         )}
         <div>
            <Modal
               open={openTodoInputModal}
               onClose={closeInputModal}
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description"
            >
               <div className={classes.paper}>
                  <h2
                     id="simple-modal-title"
                     className={classes.inputModalHeader}
                  >
                     {modalHeader}
                  </h2>
                  <TextField
                     className={classes.textFieldModal}
                     placeholder="Enter todo title"
                     onChange={(e) => {
                        setTodoDataForm({
                           ...todoDataForm,
                           title: e.target.value,
                        })
                        if (!e.target.value) {
                           if (todoDataForm.description) {
                              setFormValid(false)
                              setDescriptionError('')
                              setTitleError('Title not must be empty')
                           } else if (!todoDataForm.description) {
                              setFormValid(false)
                              setDescriptionError(
                                 'Description not must be empty'
                              )
                              setTitleError('Title not must be empty')
                           }
                        } else if (e.target.value) {
                           if (todoDataForm.description) {
                              setFormValid(true)
                              setDescriptionError('')
                              setTitleError('')
                           } else if (!todoDataForm.description) {
                              setFormValid(false)
                              setDescriptionError(
                                 'Description not must be empty'
                              )
                              setTitleError('')
                           }
                           if (!clickDescriptionInput) {
                              setDescriptionError('')
                           }
                        }
                     }}
                     name="title"
                     type="text"
                     inputProps={{ maxLength: 100 }}
                     value={todoDataForm.title}
                     onClick={() => setClickTitleInput(true)}
                  />
                  {titleError && (
                     <div style={{ color: 'red' }}>{titleError}</div>
                  )}
                  <TextField
                     className={classes.textFieldModal}
                     placeholder="Enter todo description"
                     onChange={(e) => {
                        setTodoDataForm({
                           ...todoDataForm,
                           description: e.target.value,
                        })
                        if (!e.target.value) {
                           if (todoDataForm.title) {
                              setFormValid(false)
                              setTitleError('')
                              setDescriptionError(
                                 'Description not must be empty'
                              )
                           } else if (!todoDataForm.title) {
                              setFormValid(false)
                              setTitleError('Title not must be empty')
                              setDescriptionError(
                                 'Description not must be empty'
                              )
                           }
                        } else if (e.target.value) {
                           if (todoDataForm.title) {
                              setFormValid(true)
                              setTitleError('')
                              setDescriptionError('')
                           } else if (!todoDataForm.title) {
                              setFormValid(false)
                              setTitleError('Title not must be empty')
                              setDescriptionError('')
                           }
                           if (!clickTitleInput) {
                              setTitleError('')
                           }
                        }
                     }}
                     name="description"
                     inputProps={{ maxLength: 250 }}
                     value={todoDataForm.description}
                     onClick={() => setClickDescriptionInput(true)}
                  />
                  {descriptionError && (
                     <div style={{ color: 'red' }}>{descriptionError}</div>
                  )}
                  <div className={classes.modalBlockWithButtons}>
                     <Button
                        className={classes.okButton}
                        onClick={() => {
                           modalType == 'add-todo'
                              ? addTodoRequest()
                              : updateTodoRequest(todoData.id, todoData.index)
                           closeInputModal()
                           setFormValid(false)
                        }}
                        disabled={!formValid}
                     >
                        Ok
                     </Button>
                     <Button
                        className={classes.closeButton}
                        onClick={closeInputModal}
                     >
                        Close
                     </Button>
                  </div>
               </div>
            </Modal>
         </div>

         <div>
            <Modal
               open={todoDataOpen}
               onClose={closeTodoData}
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description"
            >
               <div className={classes.paper}>
                  <Typography>
                     <strong>TITLE:</strong> {todo.title}
                  </Typography>
                  <Typography>
                     <strong>DESCRIPTION:</strong> {todo.description}
                  </Typography>
                  <Typography>
                     <strong>STATUS:</strong> {todo.status}
                  </Typography>
                  <Typography>
                     <strong>CREATED DATE:</strong> {todo.date}
                  </Typography>
                  <Typography>
                     <strong>COMPLETED DATE:</strong> {todo.completedDate}
                  </Typography>
                  <Button
                     className={classes.closeModalWithTodoData}
                     onClick={closeTodoData}
                  >
                     Close
                  </Button>
               </div>
            </Modal>
         </div>

         <div>
            <Modal
               open={linkOpen}
               onClose={closeLink}
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description"
            >
               <div className={classes.paper}>
                  <div
                     onClick={() => {
                        history.push(link)
                     }}
                     style={{ wordBreak: 'break-all' }}
                  >
                     {link && link}
                  </div>
                  <Button
                     className={classes.closeModalWithTodoData}
                     onClick={closeLink}
                  >
                     Close
                  </Button>
               </div>
            </Modal>
         </div>
      </>
   )
}
