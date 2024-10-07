"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Grid, List, SortAsc, SortDesc, Folder, File, ChevronRight, Settings, Plus, Upload, Menu, Search, Trash2, Move, Image, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  const [viewSize, setViewSize] = useState("medium")
  const [view, setView] = useState("grid")
  const [sortOrder, setSortOrder] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentFolder, setCurrentFolder] = useState(null)
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: null, name: "Thorbis" }])
  const [mediaItems, setMediaItems] = useState([
    { id: "1", name: "Documents", type: "folder", createdAt: "2023-06-01", modifiedAt: "2023-06-01", parentId: null },
    { id: "2", name: "Images", type: "folder", createdAt: "2023-06-02", modifiedAt: "2023-06-02", parentId: null },
    { id: "3", name: "Videos", type: "folder", createdAt: "2023-06-03", modifiedAt: "2023-06-03", parentId: null },
    { id: "4", name: "Report.pdf", type: "document", url: "/placeholder.svg?height=100&width=100", size: 1024000, createdAt: "2023-06-04", modifiedAt: "2023-06-04", parentId: null },
    { id: "5", name: "Profile.jpg", type: "image", url: "/placeholder.svg?height=100&width=100", size: 2048000, createdAt: "2023-06-05", modifiedAt: "2023-06-05", parentId: null, altText: "Profile picture" },
    { id: "6", name: "Presentation.pptx", type: "document", url: "/placeholder.svg?height=100&width=100", size: 3072000, createdAt: "2023-06-06", modifiedAt: "2023-06-06", parentId: "1" },
    { id: "7", name: "Vacation.jpg", type: "image", url: "/placeholder.svg?height=100&width=100", size: 4096000, createdAt: "2023-06-07", modifiedAt: "2023-06-07", parentId: "2", altText: "Vacation scenery" },
    { id: "8", name: "Tutorial.mp4", type: "video", url: "/placeholder.svg?height=100&width=100", size: 10240000, createdAt: "2023-06-08", modifiedAt: "2023-06-08", parentId: "3" },
  ])
  const [editingItem, setEditingItem] = useState(null)
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState(new Set())
  const fileInputRef = useRef(null)

  const filteredItems = mediaItems.filter(item => 
    item.parentId === currentFolder && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") return -1
    if (a.type !== "folder" && b.type === "folder") return 1
    return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  })

  const openSidePanel = (item) => {
    setEditingItem(item)
    setIsSidePanelOpen(true)
  }

  const closeSidePanel = () => {
    setEditingItem(null)
    setIsSidePanelOpen(false)
  }

  const handleEditSave = () => {
    if (editingItem) {
      setMediaItems(mediaItems.map(item => item.id === editingItem.id ? editingItem : item))
      closeSidePanel()
      toast({ title: "Changes saved", description: "Your changes have been saved successfully." })
    }
  }

  const handleDeleteItem = () => {
    if (editingItem) {
      setMediaItems(mediaItems.filter(item => item.id !== editingItem.id))
      closeSidePanel()
      toast({ title: "Item deleted", description: "The item has been deleted successfully." })
    }
  }

  const handleFolderClick = (folderId, folderName) => {
    setCurrentFolder(folderId)
    setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }])
  }

  const handleBreadcrumbClick = (index) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(newBreadcrumbs)
    setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].id)
  }

  const handleNewFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        type: "folder",
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        parentId: currentFolder,
      }
      setMediaItems([...mediaItems, newFolder])
      setNewFolderName("")
      setIsNewFolderModalOpen(false)
    }
  }

  const toggleItemSelection = (itemId) => {
    const newSelectedItems = new Set(selectedItems)
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId)
    } else {
      newSelectedItems.add(itemId)
    }
    setSelectedItems(newSelectedItems)
  }

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.size === sortedItems.length ? new Set() : new Set(sortedItems.map(item => item.id)))
  }

  const handleMassDelete = () => {
    const newMediaItems = mediaItems.filter(item => !selectedItems.has(item.id))
    setMediaItems(newMediaItems)
    setSelectedItems(new Set())
    toast({ title: "Items deleted", description: `${selectedItems.size} item(s) have been deleted.` })
  }

  const handleMassMove = () => {
    toast({ title: "Items moved", description: `${selectedItems.size} item(s) have been moved.` })
    setSelectedItems(new Set())
  }

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Delete") handleMassDelete()
    else if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSelectAll()
    }
  }, [selectedItems, sortedItems])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const getItemSize = () => {
    switch (viewSize) {
      case "small": return "w-32 h-32"
      case "medium": return "w-40 h-40"
      case "large": return "w-48 h-48"
    }
  }

  const getIconSize = () => {
    switch (viewSize) {
      case "small": return "h-12 w-12"
      case "medium": return "h-16 w-16"
      case "large": return "h-20 w-20"
    }
  }

  const getGridCols = () => {
    switch (viewSize) {
      case "small": return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
      case "medium": return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      case "large": return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    }
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "folder": return <Folder className={`${getIconSize()} text-blue-500`} />
      case "image": return <Image className={`${getIconSize()} text-green-500`} />
      case "video": return <Video className={`${getIconSize()} text-red-500`} />
      default: return <File className={`${getIconSize()} text-gray-500`} />
    }
  }

  const renderGridView = useCallback(() => (
    <div className={`grid gap-4 p-4 ${getGridCols()}`}>
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className={`group relative flex flex-col items-center justify-center ${getItemSize()} p-4 rounded-lg border-2 border-transparent hover:border-primary hover:bg-muted transition-all duration-200 cursor-pointer`}
          onClick={() => item.type === "folder" ? handleFolderClick(item.id, item.name) : openSidePanel(item)}
        >
          <div className="absolute top-2 left-2">
            <Checkbox
              checked={selectedItems.has(item.id)}
              onCheckedChange={() => toggleItemSelection(item.id)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {item.type === "image" ? (
            <div className={`${getIconSize()} rounded-lg overflow-hidden`}>
              <img src={item.url} alt={item.altText || item.name} className="object-cover w-full h-full" />
            </div>
          ) : (
            getFileIcon(item.type)
          )}
          <p className="w-full mt-2 text-sm font-medium text-center truncate">{item.name}</p>
          <div
            className="absolute transition-opacity opacity-0 bottom-2 right-2 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              openSidePanel(item)
            }}
          >
            <Settings className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  ), [sortedItems, viewSize, getItemSize, getIconSize, getGridCols, selectedItems])

  const renderListView = useCallback(() => (
    <div className="p-2 space-y-1">
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center p-2 space-x-2 rounded-lg cursor-pointer group hover:bg-muted"
          onClick={() => item.type === "folder" ? handleFolderClick(item.id, item.name) : openSidePanel(item)}
        >
          <Checkbox
            checked={selectedItems.has(item.id)}
            onCheckedChange={() => toggleItemSelection(item.id)}
            onClick={(e) => e.stopPropagation()}
          />
          {item.type === "image" ? (
            <div className="w-10 h-10 overflow-hidden rounded-lg">
              <img src={item.url} alt={item.altText || item.name} className="object-cover w-full h-full" />
            </div>
          ) : (
            getFileIcon(item.type)
          )}
          <span className="flex-grow text-sm font-medium truncate">{item.name}</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">{item.size ? `${(item.size / 1024 / 1024).toFixed(2)} MB` : '-'}</span>
          <div
            className="transition-opacity opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              openSidePanel(item)
            }}
          >
            <Settings className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  ), [sortedItems, selectedItems])

  return (
    <div className="flex flex-col h-screen p-6 bg-background">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsNewFolderModalOpen(true)}>New Folder</DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>Upload File</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => console.log("Files to upload:", Array.from(e.target.files || []))}
            multiple
          />
          <Button variant="outline" size="sm" onClick={handleSelectAll}>
            <Checkbox
              checked={selectedItems.size === sortedItems.length && sortedItems.length > 0}
              onCheckedChange={handleSelectAll}
              className="w-3 h-3 mr-2"
            />
            Select All
          </Button>
          {selectedItems.size > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Actions ({selectedItems.size})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleMassDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleMassMove}>
                  <Move className="w-4 h-4 mr-2" />
                  Move
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="flex items-center mb-6 space-x-4">
        <Input
          type="text"
          placeholder="Search media..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={viewSize} onValueChange={(value) => setViewSize(value)}>
              <DropdownMenuRadioItem value="small">Small icons</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="medium">Medium icons</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="large">Large icons</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
        </Button>
      </div>

      {view === "grid" ? renderGridView() : renderListView()}

      <Sheet open={isSidePanelOpen} onOpenChange={setIsSidePanelOpen}>
        <SheetContent className="w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>File Details</SheetTitle>
          </SheetHeader>
          {editingItem && (
            <div className="py-4 space-y-4">
              {editingItem.type === "image" && (
                <div className="overflow-hidden rounded-lg aspect-video">
                  <img src={editingItem.url} alt={editingItem.altText || editingItem.name} className="object-cover w-full h-full" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
              </div>
              {editingItem.type === "image" && (
                <div className="space-y-2">
                  <Label htmlFor="altText">Alt Text</Label>
                  <Textarea
                    id="altText"
                    value={editingItem.altText || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                    rows={2}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label>Type</Label>
                <p className="text-sm">{editingItem.type}</p>
              </div>
              {editingItem.size && (
                <div className="space-y-2">
                  <Label>Size</Label>
                  <p className="text-sm">{(editingItem.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
              <div className="space-y-2">
                <Label>Created</Label>
                <p className="text-sm">{new Date(editingItem.createdAt).toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <Label>Modified</Label>
                <p className="text-sm">{new Date(editingItem.modifiedAt).toLocaleString()}</p>
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={closeSidePanel}>Cancel</Button>
            <Button onClick={handleEditSave}>Save</Button>
            <Button variant="destructive" onClick={handleDeleteItem}>Delete</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={isNewFolderModalOpen} onOpenChange={setIsNewFolderModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="folderName">Folder Name</Label>
              <Input
                id="folderName"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewFolderModalOpen(false)}>Cancel</Button>
            <Button onClick={handleNewFolder}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}