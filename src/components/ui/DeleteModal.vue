<script>
export default {
  name: "DeleteModal",

  methods:{
    async deleteResource(id) {
      try {
        const response = await fetch(`http://localhost:8000/api/campaign/${id}`, {
          method: 'DELETE'
        })
        this.$router.push('/auth/index')
      } catch (err) {
        console.error('Error Deleting')
      }
    }
  }
}
</script>

<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Delete
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">DELETE!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to Delete this Campaign
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal" @click="deleteResource(this.$route.params.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>