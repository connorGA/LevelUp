class CreateExperiences < ActiveRecord::Migration[7.1]
  def change
    create_table :experiences do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :exp
      t.integer :level

      t.timestamps
    end
  end
end
