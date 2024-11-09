class TasksController < ApplicationController
    before_action :authenticate_user! # Ensure user is logged in
    before_action :set_task, only: [:show, :update, :complete, :reset] # Add :update here
  
    # GET /tasks
    def index
      @tasks = current_user.tasks || [] # Initialize as an empty array if no tasks are found
    end
  
    # GET /tasks/:id
    def show
      render json: @task
    end
  
    # POST /tasks
    def create
      @task = current_user.tasks.build(task_params)
      if @task.save
        render json: { task: @task, message: "Task created successfully" }, status: :created
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # PATCH /tasks/:id
    def update
      if @task.update(task_params)
        render json: { task: @task, message: "Task updated successfully" }
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # POST /tasks/:id/complete
    def complete
      exp_awarded = @task.complete_task
      if exp_awarded
        render json: { task: @task, exp_awarded: exp_awarded, message: "Task completed and EXP awarded!" }
      else
        render json: { error: "Task could not be completed" }, status: :unprocessable_entity
      end
    end
  
    # POST /tasks/:id/reset
    def reset
      if @task.reset_task
        render json: { task: @task, message: "Task reset successfully" }
      else
        render json: { error: "Task could not be reset" }, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_task
      @task = current_user.tasks.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Task not found" }, status: :not_found
    end
  
    def task_params
        params.require(:task).permit(:name, :title, :description, :frequency, :duration)
    end

    def destroy
        if @task.destroy
          render json: { message: "Task deleted successfully" }
        else
          render json: { error: "Task could not be deleted" }, status: :unprocessable_entity
        end
    end
      
      
  end
  