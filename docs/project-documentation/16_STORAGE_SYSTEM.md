# Storage System Documentation

**Project:** Infinite Interior Decor  
**Path:** `C:\Users\Ayaan\Desktop\Infinite-Interior\js\storage.js`  
**Last Updated:** 2026-07-31

---

## Overview

The Infinite Interior Decor project uses a dual-layer storage system combining IndexedDB for persistent storage and localStorage for fallback. This ensures data persistence across browser sessions with graceful degradation.

---

## Storage Architecture

### Storage Layers

```
┌─────────────────────────────────────────┐
│         Storage Engine                   │
├─────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐   │
│  │  IndexedDB   │  │ localStorage │   │
│  │  (Primary)   │  │  (Fallback)  │   │
│  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────┘
```

### Storage Strategy

**Primary Storage:** IndexedDB
- Large data capacity
- Asynchronous operations
- Structured data storage
- Indexed queries

**Fallback Storage:** localStorage
- Synchronous operations
- Smaller data capacity
- Simple key-value storage
- Universal browser support

**Temporary Storage:** sessionStorage
- Session-based
- Cleared on tab close
- Used for caching

---

## Storage Engine Implementation

### Class Definition

```javascript
class StorageEngine {
  constructor() {
    this.keys = {
      draft: 'estimator_draft',
      drafts: 'estimator_drafts',
      settings: 'estimator_settings',
      cache: 'estimator_cache'
    };
    
    this.dbName = 'InfiniteInteriorEstimator';
    this.dbVersion = 1;
    this.db = null;
  }
}
```

### Singleton Pattern

The Storage Engine uses the singleton pattern:

```javascript
window.EstimatorStorage = StorageEngine.getInstance();
```

---

## IndexedDB Setup

### Database Configuration

**Database Name:** `InfiniteInteriorEstimator`  
**Version:** `1`

### Object Stores

#### drafts Store

**Purpose:** Store draft estimates

**Schema:**
```javascript
{
  keyPath: 'id',
  indexes: [
    { name: 'created', keyPath: 'created', unique: false },
    { name: 'updated', keyPath: 'updated', unique: false }
  ]
}
```

**Data Structure:**
```javascript
{
  id: string,
  data: Object,
  created: string (ISO timestamp),
  updated: string (ISO timestamp)
}
```

#### cache Store

**Purpose:** Cache frequently accessed data

**Schema:**
```javascript
{
  keyPath: 'key',
  indexes: [
    { name: 'expiry', keyPath: 'expiry', unique: false }
  ]
}
```

**Data Structure:**
```javascript
{
  key: string,
  data: any,
  expiry: string (ISO timestamp)
}
```

---

## Storage Methods

### Initialization

#### init()

Initialize the storage engine.

```javascript
async init() → Promise<boolean>
```

**Process:**
1. Initialize IndexedDB
2. Create object stores
3. Handle version upgrades
4. Return success status

**Example:**
```javascript
const success = await window.EstimatorStorage.init();
console.log(success); // true
```

---

### Draft Management

#### saveDraft(data)

Save a draft to storage.

```javascript
async saveDraft(data: Object) → Promise<string>
```

**Parameters:**
- `data` - Draft data object

**Returns:** Draft ID

**Process:**
1. Generate draft ID if not provided
2. Add metadata (created, updated)
3. Save to IndexedDB
4. Save current draft ID to localStorage
5. Return draft ID

**Example:**
```javascript
const draftId = await window.EstimatorStorage.saveDraft({
  projectCategory: 'full_interior',
  budget: 1000000
});
console.log(draftId); // "1234567890-abc123def"
```

#### loadDraft(draftId)

Load a draft from storage.

```javascript
async loadDraft(draftId: string) → Promise<Object|null>
```

**Parameters:**
- `draftId` - Draft ID to load

**Returns:** Draft data or `null` if not found

**Process:**
1. Load from IndexedDB
2. Return draft data
3. Fallback to localStorage on error

**Example:**
```javascript
const draft = await window.EstimatorStorage.loadDraft('1234567890-abc123def');
console.log(draft); // { projectCategory: 'full_interior', budget: 1000000 }
```

#### deleteDraft(draftId)

Delete a draft from storage.

```javascript
async deleteDraft(draftId: string) → Promise<boolean>
```

**Parameters:**
- `draftId` - Draft ID to delete

**Returns:** Success status

**Process:**
1. Delete from IndexedDB
2. Clear current draft ID if deleted
3. Return success status

**Example:**
```javascript
const success = await window.EstimatorStorage.deleteDraft('1234567890-abc123def');
console.log(success); // true
```

#### listDrafts()

List all drafts.

```javascript
async listDrafts() → Promise<Array>
```

**Returns:** Array of drafts sorted by update date

**Process:**
1. Get all drafts from IndexedDB
2. Sort by updated date (newest first)
3. Return sorted array

**Example:**
```javascript
const drafts = await window.EstimatorStorage.listDrafts();
console.log(drafts.length); // 5
```

---

### Cache Management

#### saveToCache(key, data, ttl?)

Save data to cache.

```javascript
async saveToCache(key: string, data: any, ttl?: number) → Promise<void>
```

**Parameters:**
- `key` - Cache key
- `data` - Data to cache
- `ttl` - Time to live in milliseconds (optional)

**Process:**
1. Calculate expiry time
2. Save to IndexedDB cache store
3. Return on success

**Example:**
```javascript
await window.EstimatorStorage.saveToCache('materials', materialsData, 3600000);
```

#### loadFromCache(key)

Load data from cache.

```javascript
async loadFromCache(key: string) → Promise<Object|null>
```

**Parameters:**
- `key` - Cache key

**Returns:** Cached data or `null` if not found/expired

**Process:**
1. Load from IndexedDB
2. Check expiry
3. Return data if valid
4. Return null if expired

**Example:**
```javascript
const data = await window.EstimatorStorage.loadFromCache('materials');
console.log(data); // { materials: [...] }
```

#### clearCache()

Clear all cached data.

```javascript
async clearCache() → Promise<void>
```

**Process:**
1. Clear cache store
2. Return on success

**Example:**
```javascript
await window.EstimatorStorage.clearCache();
```

---

### IndexedDB Operations

#### saveToIndexedDB(storeName, data)

Save data to IndexedDB store.

```javascript
saveToIndexedDB(storeName: string, data: Object) → Promise<void>
```

**Parameters:**
- `storeName` - Store name
- `data` - Data to save

**Example:**
```javascript
await window.EstimatorStorage.saveToIndexedDB('drafts', draftData);
```

#### loadFromIndexedDB(storeName, key)

Load data from IndexedDB store.

```javascript
loadFromIndexedDB(storeName: string, key: string) → Promise<Object|null>
```

**Parameters:**
- `storeName` - Store name
- `key` - Data key

**Returns:** Data or `null`

**Example:**
```javascript
const data = await window.EstimatorStorage.loadFromIndexedDB('drafts', 'draft-id');
```

#### deleteFromIndexedDB(storeName, key)

Delete data from IndexedDB store.

```javascript
deleteFromIndexedDB(storeName: string, key: string) → Promise<void>
```

**Parameters:**
- `storeName` - Store name
- `key` - Data key

**Example:**
```javascript
await window.EstimatorStorage.deleteFromIndexedDB('drafts', 'draft-id');
```

#### getAllFromIndexedDB(storeName)

Get all data from IndexedDB store.

```javascript
getAllFromIndexedDB(storeName: string) → Promise<Array>
```

**Parameters:**
- `storeName` - Store name

**Returns:** Array of all data

**Example:**
```javascript
const drafts = await window.EstimatorStorage.getAllFromIndexedDB('drafts');
```

---

### localStorage Fallback

#### saveDraftToLocalStorage(data)

Save draft to localStorage (fallback).

```javascript
saveDraftToLocalStorage(data: Object) → string
```

**Parameters:**
- `data` - Draft data

**Returns:** Draft ID

**Example:**
```javascript
const draftId = window.EstimatorStorage.saveDraftToLocalStorage(data);
```

#### loadDraftFromLocalStorage(draftId)

Load draft from localStorage (fallback).

```javascript
loadDraftFromLocalStorage(draftId: string) → Object|null
```

**Parameters:**
- `draftId` - Draft ID

**Returns:** Draft data or `null`

**Example:**
```javascript
const draft = window.EstimatorStorage.loadDraftFromLocalStorage('draft-id');
```

#### deleteDraftFromLocalStorage(draftId)

Delete draft from localStorage (fallback).

```javascript
deleteDraftFromLocalStorage(draftId: string) → boolean
```

**Parameters:**
- `draftId` - Draft ID

**Returns:** Success status

**Example:**
```javascript
const success = window.EstimatorStorage.deleteDraftFromLocalStorage('draft-id');
```

---

## Storage Keys

### Defined Keys

```javascript
this.keys = {
  draft: 'estimator_draft',           // Current draft ID
  drafts: 'estimator_drafts',         // All drafts
  settings: 'estimator_settings',     // User settings
  cache: 'estimator_cache'            // Cached data
}
```

### Usage

```javascript
// Get current draft ID
const currentDraftId = localStorage.getItem(this.keys.draft);

// Set current draft ID
localStorage.setItem(this.keys.draft, draftId);
```

---

## Error Handling

### Graceful Fallback

The storage engine automatically falls back to localStorage if IndexedDB fails:

```javascript
async saveDraft(data) {
  try {
    await this.saveToIndexedDB('drafts', draft);
    localStorage.setItem(this.keys.draft, draftId);
    return draftId;
  } catch (error) {
    console.error('Save draft error:', error);
    return this.saveDraftToLocalStorage(data);
  }
}
```

### Error Types

- **IndexedDB Not Supported:** Browser doesn't support IndexedDB
- **Quota Exceeded:** Storage limit reached
- **Transaction Error:** IndexedDB transaction failed
- **Network Error:** (Not applicable for local storage)

---

## Storage Best Practices

### 1. Use IndexedDB for Large Data
- Draft estimates
- Material libraries
- Cached data

### 2. Use localStorage for Small Data
- Current draft ID
- User settings
- Session flags

### 3. Handle Errors Gracefully
- Fallback to localStorage
- Log errors
- Inform user

### 4. Clean Up Old Data
- Delete old drafts
- Clear expired cache
- Manage storage limits

### 5. Use Async Operations
- IndexedDB is async
- Use promises
- Handle async/await

---

## Storage Limits

### IndexedDB
- **Limit:** Typically 50% of disk space
- **Browser Support:** Modern browsers
- **Performance:** Good for large datasets

### localStorage
- **Limit:** ~5-10 MB per domain
- **Browser Support:** Universal
- **Performance:** Good for small datasets

### sessionStorage
- **Limit:** ~5-10 MB per domain
- **Browser Support:** Universal
- **Duration:** Session only

---

## Notes

- Dual-layer storage (IndexedDB + localStorage)
- Singleton pattern
- Graceful fallback
- Draft management
- Cache management
- Asynchronous operations
- Error handling
- Storage limits awareness

---

**Last Updated:** 2026-07-31  
**Documentation Version:** 1.0.0
