class CreateDoctorLevels < ActiveRecord::Migration
  def change
    create_table :doctor_levels do |t|
      t.string  :level_name
      t.integer :points
      t.string  :level_text

      t.timestamps
    end
  end
end
