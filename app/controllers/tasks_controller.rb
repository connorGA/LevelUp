class TasksController < ApplicationController
    before_action :authenticate_user!
    before_action :set_task, only: [:complete, :reset, :update, :destroy]
  
    def create
        @task = current_user.tasks.build(task_params) # Associates the task with the logged-in user
        if @task.save
          render json: { task: @task, message: "Task created successfully." }
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
    end
      
  
    def complete
      if @task.complete_task
        render json: {
          exp: @task.user.exp,
          exp_required: @task.user.exp_required,
          level: @task.user.level,
          coins: @task.user.coins,
          diamonds: @task.user.diamonds
        }, status: :ok
      else
        render json: { error: "Task could not be completed" }, status: :unprocessable_entity
      end
    end
    
      
  
    def reset
      @task.update(completed: false)
      render json: { task: @task, message: "Task reset to pending." }
    end
  
    def update
      if @task.update(task_params)
        render json: { task: @task, message: "Task updated successfully." }
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @task.destroy
      render json: { message: "Task deleted successfully." }
    end
  
    private
  
    def set_task
      @task = Task.find(params[:id])
    end
  
    def task_params
      params.require(:task).permit(:name, :description, :frequency, :duration, :duration_type, :completed)
    end
  end
  